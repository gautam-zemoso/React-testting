const getCurrency = (currency) =>{
    let currencySign = '';
    switch (currency) {
        case "USD" :
            currencySign = '$';
            break;
        default:
    }
    return currencySign;
}

const getTotalAmount = (value,currency) => {
    if(!value){
        return "--";
    }
    if(value < 0)
        return `-${getCurrency(currency)}${Math.abs(value).toFixed(2)}`;
     else   
         return `${getCurrency(currency)}${Math.abs(value).toFixed(2)}`;

}


export const getAccountSummary = (financialSummary) =>{
    let accountSummary=[];
    financialSummary.forEach(item => {  
        let category = {
            "title": item.category,
            "amount": getTotalAmount(item.totalAmount.value,item.totalAmount.currency)
        }
        accountSummary.push(category);
    });

    return accountSummary;
}
