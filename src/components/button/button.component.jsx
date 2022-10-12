import './button.styles.scss';

export const BUTTON_TYPE_CLASS = { //change the styling of the button based on the type
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, buttonType, ...otherProps}) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASS[buttonType]}`}
            {...otherProps}
        >
            {children}
        </button>
    )
};

export default Button;