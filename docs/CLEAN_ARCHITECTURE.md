# Clean Architecture Implementation

This document describes the Clean Architecture and Domain-Driven Design (DDD) principles applied to the Primbon Jawa library.

## Architecture Overview

The project follows **Clean Architecture** with the following layers:

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│                    (Existing API / index.ts)                │
├─────────────────────────────────────────────────────────────┤
│                    Application Layer                        │
│              (Use Cases / Application Services)            │
├─────────────────────────────────────────────────────────────┤
│                      Domain Layer                           │
│     (Entities, Value Objects, Domain Services, Interfaces) │
├─────────────────────────────────────────────────────────────┤
│                   Infrastructure Layer                      │
│            (Repository Implementations, Data Sources)      │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── domain/                    # Domain Layer (Core Business Logic)
│   ├── primbon/              # Primbon bounded context
│   │   ├── entities/        # Business entities
│   │   │   ├── Weton.ts     # Weton value object
│   │   │   ├── TanggalJawa.ts
│   │   │   └── PranataMangsa.ts
│   │   ├── services/         # Domain services (pure logic)
│   │   │   ├── WetonCalculator.ts
│   │   │   ├── JodohCalculator.ts
│   │   │   └── GarisHidupCalculator.ts
│   │   └── repositories/    # Repository interfaces
│   │       ├── WatakRepository.ts
│   │       ├── JodohRepository.ts
│   │       └── ...
│   ├── pawukon/             # Pawukon bounded context
│   │   ├── entities/
│   │   ├── services/
│   │   └── repositories/
│   └── index.ts
│
├── application/             # Application Layer (Use Cases)
│   ├── primbon/
│   │   ├── WatakUseCase.ts
│   │   ├── JodohUseCase.ts
│   │   └── ...
│   ├── pawukon/
│   │   └── WukuUseCase.ts
│   └── index.ts
│
├── infrastructure/          # Infrastructure Layer
│   ├── repositories/       # Repository implementations
│   │   └── JsonDataRepository.ts
│   └── index.ts
│
├── clean/                  # Facade / Convenience exports
│   └── index.ts
│
└── utils/                  # Utilities (unchanged)
```

## Domain Layer

### Entities and Value Objects

- **Entities**: Objects with identity (e.g., `Weton`, `TanggalJawa`, `PranataMangsa`, `Wuku`)
- **Value Objects**: Immutable objects without identity (e.g., `Neptu` values)

### Domain Services

Pure business logic with **no external dependencies**:

```typescript
// Example: WetonCalculator - completely independent
import { WetonCalculator } from './domain/primbon/services/WetonCalculator.js';

const calculator = new WetonCalculator();
const weton = calculator.calculate(new Date('1990-05-15'));
console.log(weton.toString()); // "Senin Legi"
console.log(weton.neptu);      // 12
```

### Repository Interfaces

Contracts defining data access (infrastructure-agnostic):

```typescript
import type { WatakRepository } from './domain/primbon/repositories/index.js';

// Interface defines contract, implementation is in infrastructure
interface WatakRepository {
  getWatakByWeton(weton: string): WatakData | null;
  getWatakByHari(hari: string): DinoWatakData | null;
  // ...
}
```

## Application Layer (Use Cases)

Orchestrates domain objects to accomplish user tasks:

```typescript
import { WatakUseCase } from './application/primbon/index.js';
import { JsonWatakRepository } from './infrastructure/repositories/index.js';

// Dependency Injection
const repository = new JsonWatakRepository();
const useCase = new WatakUseCase(repository);

const result = useCase.getWatak(new Date('1995-03-20'));
```

## Infrastructure Layer

Concrete implementations of repository interfaces:

```typescript
import { JsonWatakRepository } from './infrastructure/repositories/index.js';

const repository = new JsonWatakRepository();
const data = repository.getWatakByWeton('Senin Legi');
```

## Usage Examples

### 1. Direct Domain Usage (Maximum Control)

```typescript
import { wetonCalculator, kalenderJawaCalculator } from './clean/index.js';

const weton = wetonCalculator.calculate(new Date());
const tanggalJawa = kalenderJawaCalculator.calculate(new Date());
```

### 2. Using Use Cases (Recommended for Features)

```typescript
import { WatakUseCase, JsonWatakRepository } from './clean/index.js';

const watakUseCase = new WatakUseCase(new JsonWatakRepository());
const watak = watakUseCase.getWatak(birthDate);
```

### 3. Using Singletons (Simplest)

```typescript
import { watakRepository, jodohRepository } from './clean/index.js';

// Use pre-configured instances
```

## Benefits of This Architecture

1. **Testability**: Domain services can be tested without any external dependencies
2. **Flexibility**: Repository interfaces allow swapping data sources (JSON, DB, API)
3. **Maintainability**: Clear separation of concerns
4. **Scalability**: Easy to add new features following the same pattern
5. **Type Safety**: Full TypeScript support with interfaces

## Migration Guide

The existing API in `src/index.ts` remains unchanged for backward compatibility. The new Clean Architecture API is available through:

```typescript
import { ... } from './clean/index.js';
```

Or import directly from specific layers:

```typescript
import { Weton } from './domain/primbon/entities/index.js';
import { WetonCalculator } from './domain/primbon/services/index.js';
import { WatakUseCase } from './application/primbon/index.js';
import { JsonWatakRepository } from './infrastructure/repositories/index.js';