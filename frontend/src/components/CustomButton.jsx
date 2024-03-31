const CustomButton = ({ styles, type, title, onClick }) => {
    return (
        <button
            onClick={onClick}
            type={type || "button"}
            className={`text-base inline-flex items-center ${styles}`}
        >
            {title}
        </button>
    );
};

export default CustomButton;