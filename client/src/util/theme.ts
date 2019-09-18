// Media queries breakpoints
// Extra small screen / phone
// @screen-xs: 480px;
// @screen-xs-min: @screen-xs;
const xsMin = 480

// Small screen / tablet
// @screen-sm: 576px;
// @screen-sm-min: @screen-sm;
const smMin = 576

// Medium screen / desktop
// @screen-md: 768px;
// @screen-md-min: @screen-md;
const mdMin = 768

// Large screen / wide desktop
// @screen-lg: 992px;
// @screen-lg-min: @screen-lg;
const lgMin = 992

// Extra large screen / full hd
// @screen-xl: 1200px;
// @screen-xl-min: @screen-xl;
// @screen-xl-min: @screen-xl;
const xlMin = 1200

// Extra extra large screen / large desktop
// @screen-xxl: 1600px;
// @screen-xxl-min: @screen-xxl;
const xxlMin = 1600

// provide a maximum
// @screen-xs-max: (@screen-sm-min - 1px);
// @screen-sm-max: (@screen-md-min - 1px);
// @screen-md-max: (@screen-lg-min - 1px);
// @screen-lg-max: (@screen-xl-min - 1px);
// @screen-xl-max: (@screen-xxl-min - 1px);
export const xsMax = smMin - 1
export const smMax = mdMin - 1
export const mdMax = lgMin - 1
export const lgMax = xlMin - 1
export const xlMax = xxlMin - 1

export const theme = {
  breakpoints: {
    xs: {
      min: xsMin + 'px',
      max: xsMax + 'px',
    },
    sm: {
      max: smMax + 'px',
      min: smMin + 'px',
    },
    md: {
      max: mdMax + 'px',
      min: mdMin + 'px',
    },
    lg: {
      max: lgMax + 'px',
      min: lgMin + 'px',
    },
    xl: {
      max: xlMax + 'px',
      min: xlMin + 'px',
    },
    xxl: {
      min: xxlMin + 'px',
    },
  },
}

type CustomeTheme = typeof theme
declare module 'styled-components' {
  interface DefaultTheme extends CustomeTheme {}
}
