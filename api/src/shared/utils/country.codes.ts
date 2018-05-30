
export function getCountryCode(countryName: string): string{
    
    switch(countryName.toLowerCase()) { 
        case "russia": { 
           return "ru"
        } 
        case "uruguay": { 
           return "uy"
        } 
        case "poland": { return "pl"}
case "senegal": { return "sn"}
case "colombia": { return "co"}
case "japan": { return "jp"}
case "belgium": { return "be"}
case "panama": { return "pa"}
case "tunisia": { return "tn"}
case "england": { return "gb"}
case "germany": { return "de"}
case "mexico": { return "mx"}
case "sweden": { return "se"}
case "korea republic": { return "kr"}
case "serbia": { return "rs"}
case "costa rica": { return "cr"}
case "switzerland": { return "ch"}
case "brazil": { return "br"}
case "nigeria": { return "ng"}
case "croatia": { return "hr"}
case "iceland": { return "is"}
case "argentina": { return "ar"}
case "denmark": { return "dk"}
case "peru": { return "pe"}
case "australia": { return "au"}
case "france": { return "fr"}
case "iran": { return "ir"}
case "morocco": { return "ma"}
case "spain": { return "es"}
case "portugal": { return "pt"}
case "saudi arabia": { return "sa"}
case "egypt": { return "eg"}


        default: {  
           break; 
        } 
     } 
} 