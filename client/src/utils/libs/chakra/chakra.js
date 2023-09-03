import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";


export const theme = extendTheme({
    styles: {
        global: (props) => ({
            body: {
                bg: mode("#eee", null)(props),
                // bg: mode("#fff8ee", null)(props),
                // bg: mode("#0a163a", null)(props),
                color: mode("#fff", null)(props),
            },
        })
    },
})
