import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Utility = (e) => {
    const navigate = useNavigate()
    
    // Navigation
    const goTo = To => navigate(To, { replace: true} )

    // Notification
    const notify = info => toast(info, {
        style: {fontSize: '14px'}
    })

    const flattenObject = (input) => {
        let result = {};
        for (const key in input) {
         if (!input.hasOwnProperty(key)) {
           continue;
         } 
         if (typeof input[key] === "object" &&!Array.isArray(input[key])) {
               var subFlatObject = flattenObject(input[key]);
               for (const subkey in subFlatObject) {
                   result[key + "_" + subkey] = subFlatObject[subkey];
               }
           } else {
               result[key] = input[key];
           }
         }
         return result;
      }

    const sortObject = (obj) => {
        return Object.entries(obj).sort((a,b)=>b[1]-a[1])
    }
    const sortObjectvii = (obj) =>{
        const sortedArr = Object.entries(obj)
        .sort((a,b)=>b[1]-a[1])
        const sorted = Object.fromEntries(sortedArr)
        return sorted
    }
    const minifyArray = (arr) => {
        let newObj = {}

        arr.forEach((item) => {
            if (Object.keys(newObj).indexOf(item) < 0){
                newObj[item] = 1
            }else{
                newObj[item] = newObj[item] + 1
            }
        })

        return sortObjectvii(newObj)
    }
    const firstLetterUpper = (name) => {
        let x = name.toLowerCase();
        const firstLetter = x[0].toUpperCase()
        const remainder = x.slice(1);
        const justified = firstLetter+remainder;
        return justified;
    }
    const filterArray  = (username, arr) => {
        //remove every occurence of username
        const newArr = arr.filter((items) => items !== username)
        return newArr
    }
    const removeDuplicate = (arr) => {
        let uniqueChars = [...new Set(arr)];
        return uniqueChars
    }

    return { goTo, notify, flattenObject, sortObject, sortObjectvii, minifyArray, firstLetterUpper, filterArray, removeDuplicate}
}