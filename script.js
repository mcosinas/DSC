$(document).ready(function(){

    var savingsCalculator_meters = 0,
        savingsCalculator_fieldiesCost = 0,
        savingsCalculator_fieldiesNumber = 0,
        savingsCalculator_boxesNumber = 0,
        savingsCalculator_efficiency = 100,
        savingsCalculator_errorRate = 5;

    var $savingsCalculator_meters,
        $savingsCalculator_fieldiesCost,
        $savingsCalculator_fieldiesNumber,
        $savingsCalculator_boxesNumber,
        $savingsCalculator_efficiency,
        $savingsCalculator_errorRate;

    var $savingsCalculator_meters_text,
        $savingsCalculator_fieldiesCost_text,
        $savingsCalculator_fieldiesNumber_text,
        $savingsCalculator_boxesNumber_text;

    var $dynamicsSavingsCalculator = $(".dynamics-savings-calculator").first();

    $savingsCalculator_meters = $("#savingsCalculator_meters"),
    $savingsCalculator_fieldiesCost = $("#savingsCalculator_fieldiesCost"),
    $savingsCalculator_fieldiesNumber = $("#savingsCalculator_fieldiesNumber"),
    $savingsCalculator_boxesNumber = $("#savingsCalculator_boxesNumber"),
    $savingsCalculator_efficiency = $("#savingsCalculator_efficiency"),
    $savingsCalculator_errorRate = $("#savingsCalculator_errorRate");

    $savingsCalculator_meters_text = $("#savingsCalculator_meters_text"),
    $savingsCalculator_fieldiesCost_text = $("#savingsCalculator_fieldiesCost_text"),
    $savingsCalculator_fieldiesNumber_text = $("#savingsCalculator_fieldiesNumber_text"),
    $savingsCalculator_boxesNumber_text = $("#savingsCalculator_boxesNumber_text");

    $resultCIwI = $("#dynamics-savings-calculator-result-CIwI");
    $resultCII = $("#dynamics-savings-calculator-result-CII");
    $resultIncorrect = $("#dynamics-savings-calculator-result-incorrect");
    $resultMoneyWasted = $("#dynamics-savings-calculator-result-moneyWasted");
    $resultExpectedSavings = $("#dynamics-savings-calculator-result-expectedSavings");

    function dynamicsCalculatorUpdateResults(results){

        if(results.CIwI == undefined || results.CII == undefined || results.incorrect == undefined || results.moneyWasted == undefined) return false;
    
        if($resultCIwI.length) $resultCIwI.text(Math.round(results.CIwI).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        if($resultCII.length) $resultCII.text(Math.round(results.CII).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        if($resultIncorrect.length) $resultIncorrect.text(Math.round(results.incorrect).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        if($resultMoneyWasted.length) $resultMoneyWasted.text(Math.round(results.moneyWasted).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        if($resultExpectedSavings.length) $resultExpectedSavings.text('$' + Math.round(results.CIwI - results.CII).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        
    
        return true;
    
    }

    function dynamicsCalculatorClearResults(){

        var fieldPlaceHolder = "--";
    
        if($resultCIwI.length) $resultCIwI.text(fieldPlaceHolder);
        if($resultCII.length) $resultCII.text(fieldPlaceHolder);
        if($resultIncorrect.length) $resultIncorrect.text(fieldPlaceHolder);
        if($resultMoneyWasted.length) $resultMoneyWasted.text(fieldPlaceHolder);
        if($resultExpectedSavings.length) $resultExpectedSavings.text(fieldPlaceHolder);
    
    }
    
    function dynamicsCalculateSavings(){
        
        
        if(!(savingsCalculator_meters > 0 && savingsCalculator_fieldiesCost > 0 && savingsCalculator_fieldiesNumber > 0 && savingsCalculator_boxesNumber> 0)){
            
            return false;
            
        }
    
        var results = {
            CIwI: 0,
            CII: 0,
            incorrect: 0,
            moneyWasted: 0
        };
    
        var metersPerBox = 4;
    
        results.CIwI = ((savingsCalculator_meters / metersPerBox) / savingsCalculator_boxesNumber) * savingsCalculator_fieldiesCost * savingsCalculator_fieldiesNumber;
        results.CII = ((savingsCalculator_meters / metersPerBox) / (savingsCalculator_boxesNumber * (1 + (savingsCalculator_efficiency / 100)))) * savingsCalculator_fieldiesCost * savingsCalculator_fieldiesNumber;
        results.incorrect = (savingsCalculator_meters / metersPerBox) * (savingsCalculator_errorRate / 100); 	
        results.moneyWasted = results.CIwI * (savingsCalculator_errorRate / 100); 	
    
        return results;
        
    }
    
    function dynamicsUpdateCalculatorTextFields(){

        if($savingsCalculator_meters_text[0] != undefined) $savingsCalculator_meters_text[0].value = $savingsCalculator_meters[0].value;
        if($savingsCalculator_fieldiesCost_text[0] != undefined) $savingsCalculator_fieldiesCost_text[0].value = $savingsCalculator_fieldiesCost[0].value;
        if($savingsCalculator_fieldiesNumber_text[0] != undefined) $savingsCalculator_fieldiesNumber_text[0].value = $savingsCalculator_fieldiesNumber[0].value;
        if($savingsCalculator_boxesNumber_text[0] != undefined) $savingsCalculator_boxesNumber_text[0].value = $savingsCalculator_boxesNumber[0].value;
    
    }
    
    function dynamicsUpdateCalculatorSliders(){
    
        if($savingsCalculator_meters[0] != undefined) $savingsCalculator_meters[0].value = $savingsCalculator_meters_text[0].value;
        if($savingsCalculator_fieldiesCost[0] != undefined) $savingsCalculator_fieldiesCost[0].value = $savingsCalculator_fieldiesCost_text[0].value;
        if($savingsCalculator_fieldiesNumber[0] != undefined) $savingsCalculator_fieldiesNumber[0].value = $savingsCalculator_fieldiesNumber_text[0].value;
        if($savingsCalculator_boxesNumber[0] != undefined) $savingsCalculator_boxesNumber[0].value = $savingsCalculator_boxesNumber_text[0].value;
    
    }

    function dynamicsCalculatorCaptureValues(){

        savingsCalculator_meters = $savingsCalculator_meters_text[0].value;
        savingsCalculator_fieldiesCost = $savingsCalculator_fieldiesCost_text[0].value;
        savingsCalculator_fieldiesNumber = $savingsCalculator_fieldiesNumber_text[0].value;
        savingsCalculator_boxesNumber = $savingsCalculator_boxesNumber_text[0].value;
        savingsCalculator_efficiency = $savingsCalculator_efficiency[0].value;
        savingsCalculator_errorRate = $savingsCalculator_errorRate[0].value;

    }

    $(".dynamicsCalculatorSliderField").on("input",function(){

        dynamicsUpdateCalculatorTextFields();
        dynamicsCalculatorCaptureValues();
        $dynamicsSavingsCalculator.removeClass("error");

    });

    $(".dynamicsCalculatorTextField").on("input",function(){

        dynamicsUpdateCalculatorSliders();
        dynamicsCalculatorCaptureValues();
        $dynamicsSavingsCalculator.removeClass("error");

    });

    $(".dynamics-savings-calculator .calculate").on("click",function(){

        var results = dynamicsCalculateSavings();

        if(results !== false){

            var updateResult = dynamicsCalculatorUpdateResults(results);

            if(!updateResult){

                dynamicsCalculatorClearResults();
                $dynamicsSavingsCalculator.addClass("error");

            }

        }else{

            dynamicsCalculatorClearResults();

            $dynamicsSavingsCalculator.addClass("error");

        }

        

    });

});