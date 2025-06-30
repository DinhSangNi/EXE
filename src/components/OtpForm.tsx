import { LoadingOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";

type Props = {
    loading: boolean;
    onChange: (text: string) => void;
};

const OtpForm = ({ loading, onChange }: Props) => {
    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="py-6 text-center text-[1.3rem] font-bold">
                    Xác thực Email
                </h1>
                <p className="mb-6 text-[0.9rem]">
                    Một email với mã OTP đã được gửi tới email của ban. Vui lòng
                    nhập mã OTP để xác thực
                </p>
                <Input.OTP
                    className="mb-6"
                    size="large"
                    disabled={loading}
                    onChange={onChange}
                />
                {loading && (
                    <Spin
                        indicator={
                            <LoadingOutlined
                                style={{
                                    fontSize: 48,
                                }}
                                spin
                            />
                        }
                    />
                )}
            </div>
        </>
    );
};

export default OtpForm;
