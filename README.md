# moon accordion

Реализация аккордионов, через ```css transition```,
актозакрытие остальных аккордионов при
взаимодействии с один

***Локальный модуль verno.digital***

## Установка

```shell
# Через npm
npm i @verno.digital/moon-accordion

# Через yarn
yarn add @verno.digital/moon-accordion
```

## Использование

```ts
import { MoonAccordion } from '@verno.digital/moon-accordion'

new MoonAccordion({
  accordion: {
    selector: '.accordion',
    active: 'accordion--active'
  },
  clickArea: {
    selector: '.accordion__panel'
  },
  heightArea: {
    selector: '.accordion__body'
  },
  timeout: 200
})
```

## Настройки

```ts
interface options {
  accordion: {
    selector: string,
    active: string
  },
  clickArea: {
    selector: string
  },
  heightArea: {
    selector: string
  },
  timeout: number,
  dispatch?: {
    update?: string
  }
}
```

## License

MIT
