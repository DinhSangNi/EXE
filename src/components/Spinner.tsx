type Props = {
    className?: string;
};

const Spinner = ({ className }: Props) => {
    return (
        <>
            <div
                className={`mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500 ${className}`}
            ></div>
        </>
    );
};

export default Spinner;
