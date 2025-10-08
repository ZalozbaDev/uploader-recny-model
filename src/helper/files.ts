import { Language } from '../types/enums'

export const getIconFile = (language: Language) => {
  switch (language) {
    case Language.hsb:
      return '/images/hsb.png'
    case Language.dsb:
      return '/images/dsb.png'
    case Language.de:
      return '/images/hsb.png'
  }
}
