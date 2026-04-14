

## Plan: Actualizar teléfono de contacto y añadir WhatsApp

### Cambios

**1. `src/pages/Empresas.tsx`** (líneas 310-313)
- Cambiar el número `+52 55 1234 5678` por `+52 3323437338`
- Añadir una nueva línea debajo con ícono de WhatsApp y enlace directo a `https://wa.me/523323437338`

**2. `src/pages/issuer/IssuerSettings.tsx`** (línea 55)
- Cambiar el placeholder del input de teléfono de `+52 55 1234 5678` a `+52 33 2343 7338`

**3. `src/components/landing/Footer.tsx`**
- Añadir enlace de WhatsApp en la sección de redes sociales del footer (junto a Twitter, LinkedIn, Telegram, Discord)

### Detalle técnico
- Se usará el ícono `MessageCircle` de lucide-react como ícono de WhatsApp
- El enlace de WhatsApp será `https://wa.me/523323437338` (formato internacional sin +)

