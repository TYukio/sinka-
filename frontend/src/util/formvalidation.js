import validator from 'validator';

export function formValidateEffect(formdata, formValidator)
{
    for (var field in formdata)
    {
        if (formdata[field].err)
        {
            formValidator(false);
            return;
        }
    }
    formValidator(true);
}

export function onChangeHandler(formdata, formdataSetter, state, newValue, verifier)
{
    formdataSetter(() => ({
            ...formdata,
            [state]: {value: newValue, err: (verifier === undefined) ? formdata[state].err : !verifier(newValue), touched: true}
        })
    );
}

export function inErrorState(formdata, state)
{
    return formdata[state].err && formdata[state].touched
}

export function passwordScore(value)
{
    return Math.min(validator.isStrongPassword(value, {returnScore: true}) * 2, 100)
}

const formvalidation = {formValidateEffect, onChangeHandler, inErrorState, passwordScore};

export default formvalidation;