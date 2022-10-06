/**
 * @CarlosMontoya - CURP Validate
 */
import { AbstractControl, ValidatorFn } from "@angular/forms";

export function ValidateCURP(): ValidatorFn{
    return (control: AbstractControl): {[k:string]: any} | null => {
        let CURP = control.value;
        if(!!CURP){
            CURP = CURP.toUpperCase();
            if(CURP.length == 18 ){
                let srt = CURP.substring(0, 3); //only str
                let brd = CURP.substring(4, 9); //only nmbr
                let grn = CURP.substring(10,10); //only str
                let ent = CURP.substring(11, 12); //only str
                let cons = CURP.substring(13, 15); //only str
    
    
                let STR = hasN(srt+grn+ent+cons);
                let NMBR = hasS(brd);
                if(!STR && !NMBR){
                    return null;
                }
                else{
                    return { type: false };
                }
            }
            else
            {
                return { length: false };
            }
        }
        else{
            return { empty: false };
        }

    }



}

/**
 * @CarlosMontoya - RGX ValidationData
 */

function hasN(s:string)
{
    var rgx = /[$-/:-?{-~!"^_`\[\]¨¡¬°#\d]/g;
    return rgx.test(s);
}

function hasS(s:string)
{
    var rgx = /[$-/:-?{-~!"^_`\[\]¨¡¬°#A-Za-z]/g;
    return rgx.test(s);
}