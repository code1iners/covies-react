// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      textColor: string;
      backgroundColor: string;
      sexyRed: string;

      headers: {
        backgroundColor: string;
        textColor: string;
      };
    };
  }
}
