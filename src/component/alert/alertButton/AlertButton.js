import React from 'react';

/**
 @params
 modalContent: [text or JSX]:
    content to be displayed on Alert.
 type [any]: 
    The following is a numbered list for the types of values you can enter for type
    Each focuses on changing the type of buttons that will display with the alert.
    (1)value: JSON: {
                confirm: [function],
                cancel: [function],
                confirmText:[string] (optional),
                cancelText: [string] (optional)
            }
         description: creates a modal with a pair of buttons, one representing confirm, the other cancel.
         Must be paired with buttonInfo.confirm and buttonInfo.cancel.
         (required) buttonInfo.confirm [function]:
            A function to run when the confirm button is clicked.
         (required) buttonInfo.cancel [function]
            A function to run when the cancel button is clicked.
         (optional) buttonInfo.confirmText [string]
            The text displayed on the confirm button.
         (optional) buttonInfo.cancelText [string]
            The text displayed on the cancel button.
    (2) value: null or undefined
         A single button will be created. The button will close the modal.
         Good for simple alert prompts.
 * @returns {JSX.Element}
 * @constructor
 */
const AlertButton = (props) => {

    const {buttonInfo} = props;
    let button;

   if (typeof buttonInfo === 'object') {

       const confirm = () => {

           if(buttonInfo.confirm) buttonInfo.confirm();
           props.close();
       }
       const cancel = () => {

           if(buttonInfo.cancel) buttonInfo.cancel();
           props.close();
       }

        button = (
            <div>
                <button className="alert-button" onClick={confirm}>
                    {buttonInfo.confirmText || 'Okay'}
                </button>
                <button className="alert-button" onClick={cancel}>
                    {buttonInfo.cancelText || 'Cancel'}
                </button>
            </div>
        )
    } else {

        button = <button className="alert-button" onClick={props.close}>Dismiss</button>
    }
    
    return button;
}

export default AlertButton;