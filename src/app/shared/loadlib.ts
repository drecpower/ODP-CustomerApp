export class SSLoadLib {
    private static jsLoadedLibraries:any={};
    public static loadJSLib(libName:any,path:any): Promise<HTMLScriptElement> {
        return new Promise<HTMLScriptElement>(
            (resolve, reject) => {
                var libScriptElement = <HTMLScriptElement>document.getElementById(libName);
                if (libScriptElement == null) {
                    libScriptElement = document.createElement("script");
                    libScriptElement.id = libName;
                    libScriptElement.src = path;
                    libScriptElement.addEventListener("load",async () => {
                        resolve(libScriptElement);
                    });
                    libScriptElement.addEventListener("error", (d)=>{
                        reject(d);
                    })
                    document.head.appendChild(libScriptElement);
                } else {
                    resolve(libScriptElement);
                }
            }
        );
    }
}