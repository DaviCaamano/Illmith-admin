import React, {useState, createContext, useEffect} from 'react';
import LoadingModalContainer from "../common/modal/loadingModal/LoadingModalContainer";

//Contexts
const { Provider, Consumer} = createContext({});

const   TEN_SECONDS = 10000,
        HALF_MINUTE = 30000,
        MINUTE = 60000
const AlertProvider = (props) => {

    //Modal
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [visible, setVisible] = useState(false);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const [content, setContent] = useState('');
    const [buttonInfo, setButtonInfo] = useState({});

    //Nav Alert
    const [navVisible, setNavVisible] = useState(false);
    const [navContent, setNavContent] = useState('');
    const [navAlertDuration, setNavAlertDuration] = useState(0);
    const [closeTimeout, setCloseTimeout] = useState(0);

    /** Alert Modal Functions */
    const close = () => { setVisible(false); }

    /**
     * A confirm prompt which accepts functions for confirm and cancel.
     * These functions are required.
     * @param modalContent [String or JSX]: Displayed in the alert modal.
     * @param confirm [function]: Runs on confirm button click. Closes modal after pressed.
     * @param cancel [function]: Runs on cancel button click. Closes modal after pressed.
     * @param confirmText [string] (Optional): String to replace 'Okay' on confirm button. If null text display okay.
     * @param cancelText [string] (Optional): String to replace 'Cancel' on cancel button. If null text display okay.
     * @param height - Fixed height of the modal.
     * @param width - Fixed width of the modal.
     */
    const confirm = (modalContent, confirm, cancel, confirmText, cancelText, height, width) => {

        if(height) setHeight(height);
        if(width) setWidth(width);
        setButtonInfo({
            confirm,
            cancel,
            confirmText,
            cancelText
        });
        setContent(modalContent);
        setVisible(true);
    }

    /**
     * A simply prompt with a single button labeled "dismiss".
     * @param modalContent: [String or JSX] - Displayed in the alert modal.
     * @param height - Fixed height of the modal.
     * @param width - Fixed width of the modal.
     */
    const alert = (modalContent, height, width, buttonText) => {

        if(height) setHeight(height);
        if(width) setWidth(width);
        setContent(modalContent);
        setButtonInfo(buttonText)
        setVisible(true);
    }
    /** End of Alert Modal Functions */

    /** Nav Alert Functions */
    useEffect(() => {

        if(navContent) setNavVisible(true)
        // eslint-disable-next-line
    }, [navContent]);

    useEffect(() => {

        clearTimeout(closeTimeout);
        if(navAlertDuration)
            setCloseTimeout(setTimeout(() => { setNavVisible(false); }, navAlertDuration))
        // eslint-disable-next-line
    }, [navAlertDuration])

    const navAlert = (contents, newDuration = 'short') => {

        let milliseconds;
        if(newDuration === 'short') milliseconds = TEN_SECONDS;
        else if(newDuration === 'medium') milliseconds = HALF_MINUTE;
        else if(newDuration === 'minute') milliseconds = MINUTE;
        else if(newDuration === 'permanent' || newDuration === 'perm') milliseconds = null;
        setNavAlertDuration(milliseconds);
        setNavContent(contents)
    }

    const dismissNavAlert = () => setNavVisible(false);
    /** End of Nav Alert Functions */

    /** Loading Screen Functions */
    const startLoading = () => { setLoadingVisible(true) };
    const stopLoading = () => { setLoadingVisible(false) };
    /** End of Screen Functions */

    return (
        <Provider value={{
            visible,
            setVisible,
            content,
            setContent,
            height,
            setHeight,
            width,
            setWidth,
            buttonInfo,
            setButtonInfo,
            close,
            alert,
            confirm,
            //Navbar Alert
            navAlert,
            dismissNavAlert,
            navVisible,
            setNavVisible,
            navContent,
            setNavContent,
            //Loading Pause Screen
            loadingVisible,
            startLoading,
            stopLoading
        }}>
            <LoadingModalContainer visible={loadingVisible} />
            <Consumer>
                {props.children}
            </Consumer>
        </Provider>
    )
}

export { AlertProvider, Consumer as AlertConsumer };