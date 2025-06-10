import { BiMessageRoundedDetail } from "react-icons/bi";

type Props = { className?: string };

const ZaloButton = ({ className }: Props) => {
    return (
        <>
            <button
                className={`${className} flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2`}
            >
                <BiMessageRoundedDetail className="text-[1.2rem]" />
                Zalo: 0909316890
            </button>
        </>
    );
};

export default ZaloButton;
