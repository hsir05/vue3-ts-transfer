  import type { PropType as VuePropType } from "vue";

  // vue
declare global {
  declare type PropType<T> = VuePropType<T>;
}