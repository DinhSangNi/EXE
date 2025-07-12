import { Modal } from "antd";

type Props = {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
};

const SearchModal = ({ open, onOpenChange }: Props) => {
    return (
        <>
            <div>
                <Modal
                    open={open}
                    onCancel={() => onOpenChange?.(false)}
                ></Modal>
            </div>
        </>
    );
};

export default SearchModal;
