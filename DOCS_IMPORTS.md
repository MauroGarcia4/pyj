# Sistema de imports y alias

- Alias `@/*` apunta a `src/*` y está configurado en `tsconfig.json`:
  - `compilerOptions.paths["@/*"] = ["./src/*"]`
- Vite resuelve los paths usando el plugin `vite-tsconfig-paths` definido en `vite.config.ts`.
- Convenciones:
  - Imports externos primero (react, router, libs), luego internos ("@/...").
  - Usar alias `@` en lugar de rutas relativas profundas.
  - Componentes de página bajo `src/pages`, componentes compartidos en `src/components`.

## Lazy loading y Error Boundaries
- Las rutas usan `React.lazy` y `Suspense` para división de código.
- `src/components/ErrorBoundary.tsx` captura errores de carga y muestra fallback.

## Problemas típicos
- Error de Vite `import-analysis` indicando que no encuentra `@/pages/Algo` suele deberse a que el archivo no existe o el alias no está configurado.
- Solución: crear el archivo faltante o revisar `tsconfig.paths` y el plugin de Vite.

## Prueba de resolución
- En modo desarrollo se puede verificar con `import.meta.glob` o un `dynamic import()` y revisar la consola.

