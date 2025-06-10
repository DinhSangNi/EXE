const rentalCategory = [
    {
        title: "Phòng trọ, nhà trọ",
        category: [
            "Phòng trọ phương Nhơn Bình",
            "Phòng trọ phường Đống Đa",
            "Phòng trọ phường Trần Phú",
            "Phòng trọ phường Trần Hưng Đạo",
        ],
    },
    {
        title: "Thuê nhà nguyên căn",
        category: [
            "Thuê nhà phương Nhơn Bình",
            "Thuê nhà phường Đống Đa",
            "Thuê nhà phường Trần Phú",
            "Thuê nhà phường Trần Hưng Đạo",
        ],
    },
    {
        title: "Cho thuê căn hộ",
        category: [
            "Thuê căn hộ phương Nhơn Bình",
            "Thuê căn hộ phường Đống Đa",
            "Thuê căn hộ phường Trần Phú",
            "Thuê căn hộ phường Trần Hưng Đạo",
        ],
    },
    {
        title: "Cho thuê mặt bằng",
        category: [
            "Thuê mặt bằng phương Nhơn Bình",
            "Thuê mặt bằng phường Đống Đa",
            "Thuê mặt bằng phường Trần Phú",
            "Thuê mặt bằng phường Trần Hưng Đạo",
        ],
    },
];

const Footer = () => {
    return (
        <>
            <div className="mt-20 w-full bg-gray-100">
                <div className="mx-auto w-[90%] py-14">
                    <div className="flex justify-between">
                        {rentalCategory.map((rentalCate) => {
                            return (
                                <div>
                                    <h1 className="cursor-pointer pb-2 text-[0.9rem] font-bold hover:text-red-500">
                                        {rentalCate.title}
                                    </h1>
                                    {rentalCate.category.map((cate) => (
                                        <p className="cursor-pointer py-1 text-[0.8rem] hover:text-red-500">
                                            {cate}
                                        </p>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                    <div className="my-4 h-[2px] w-full bg-gray-200"></div>
                    <div className="flex justify-between">
                        <div>
                            <h1 className="cursor-pointer pb-2 text-[0.9rem] font-bold hover:text-red-500">
                                Về UHome
                            </h1>
                            <p className="cursor-pointer py-1 text-[0.8rem] hover:text-red-500">
                                Giới thiệu
                            </p>
                            <p className="cursor-pointer py-1 text-[0.8rem] hover:text-red-500">
                                Quy chế hoạt động
                            </p>
                            <p className="cursor-pointer py-1 text-[0.8rem] hover:text-red-500">
                                Quy định sử dụng
                            </p>
                            <p className="cursor-pointer py-1 text-[0.8rem] hover:text-red-500">
                                Chính sách bảo mật
                            </p>
                            <p className="cursor-pointer py-1 text-[0.8rem] hover:text-red-500">
                                Liên hệ
                            </p>
                        </div>
                        <div>
                            <h1 className="cursor-pointer pb-2 text-[0.9rem] font-bold hover:text-red-500">
                                Dành cho khách hàng
                            </h1>
                            <p className="cursor-pointer py-1 text-[0.8rem] hover:text-red-500">
                                Câu hỏi thường gặp
                            </p>
                            <p className="cursor-pointer py-1 text-[0.8rem] hover:text-red-500">
                                Hướng dẫn đăng tin
                            </p>
                            <p className="cursor-pointer py-1 text-[0.8rem] hover:text-red-500">
                                Bảng giá dịch vụ
                            </p>
                            <p className="cursor-pointer py-1 text-[0.8rem] hover:text-red-500">
                                Quy định đăng tin
                            </p>
                            <p className="cursor-pointer py-1 text-[0.8rem] hover:text-red-500">
                                Giải quyết khiếu nại
                            </p>
                        </div>
                        <div>
                            <h1 className="cursor-pointer pb-2 text-[0.9rem] font-bold hover:text-red-500">
                                Phương thức thanh toán
                            </h1>
                            <div className="flex flex-wrap gap-2">
                                <img
                                    src="https://phongtro123.com/images/logo-visa.svg"
                                    alt=""
                                    className="w-[35px]"
                                />
                                <img
                                    src="https://phongtro123.com/images/logo-mastercard.svg"
                                    alt=""
                                    className="w-[35px]"
                                />
                                <img
                                    src="https://phongtro123.com/images/momo_square_pinkbg.svg"
                                    alt=""
                                    className="w-[35px]"
                                />
                                <img
                                    src="https://phongtro123.com/images/zalopay-new.png"
                                    alt=""
                                    className="w-[35px]"
                                />
                            </div>
                        </div>
                        <div>
                            <h1 className="cursor-pointer pb-2 text-[0.9rem] font-bold hover:text-red-500">
                                Theo dõ UHome
                            </h1>
                            <div className="flex gap-2">
                                <a
                                    href="https://www.facebook.com/profile.php?id=61576716521616"
                                    className="transition-transform duration-200 hover:scale-110"
                                >
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEUYd/L///8Ab/EAa/EAcvIAbvGkw/jz9/6Tt/eMs/cAavEAc/IRdfLZ5vyvyfnv9f5nnfVfmfXC1vs6hvOcvfhuofbL3fvg6/3T4vykwvnj7f20zfq60fqDrffq8v5XlPR3pvYqf/M2hPNKjfQlffOGr/dFi/QAY/CviXBOAAALF0lEQVR4nN2dCXPzKA/HsYFckLNJmjRtjjbb9/t/w5c4R30HEH+TXc3s7Exngv17DEISQmJJNzL9GK8Xn7vJRXafi/X4Y9rRkxl4/PfF9mv+xiTnUqZ/Ii9/YG/zr+3iHfwGOML+erk6pVymQmvN6sT8XaSSp6fZcoH7ohjC98nqPJJC1ZNVSJWQI7aaYL5meML9bsV4qqzYCpgp16vJPvj7BCYcD94Mnd2nq6f8HozDvlJIwvHwzIUv3YNScDYMCRmMcLr85oJIdxfBT8tg0zUQ4WLOU+rXy4tO+WER5tVCEPaXTIbEu4qSbNkP8HZ0wv2XTIPjZaJTefyITvg+C7b66kTwOVXr0Ajf5yPnjc9R1IjISCHczzia7yKazylz1Z+w/9UJ30UUP/rrHG/CrUSuv7IIvuyYcH0Kuv1ZSHped0jYn/GO+dhlOc68pqoP4aTTCfonSk46IZweInzAq2j54+4pOxPu3F2/gOLxGV0JY6zAvJjNEUo4PsdZgXkRbIMj7I3ifsCbjJz2RhfCGY/NdhPpMlPtCaen+DP0LuJkHwKwJtyImDq0LFpaWzi2hLvXWIIP0SPbbcOScDCKjVQRPgxJeJSxeWpErsIRzkGBGKKkh1CEh9cENCr1Jwzhz+vsEmURvyEIf18X0CC+0Qlf+Ate5PlXfEZ4eG1Ai7X4hPBFtWhexBON2k54fH1As2m074uthINX3OirIlutmzbC3euZavXCe36Em38LoPGJWzyNZsIp+cC6O9Fps7/YTHh6JX/wmeizO+Gso41QKyEuOVKSm/8uaVNCKNWQYtQiojGw0UTY6yAmo1UqR+zwtZws1pvxeLxZrxe73vKf4/xNZ1liwgFVNoWnGgjHcC2jBdez3qbxKGI6XvSGs2/FpeVqGTUEGRsIz2Ato/jJMjNov5nZKgQXQuwiNJ/v6BDVHVq+TMNSrCXcQRehEAOnYzJbQsZrg1N1hFPk6aeyjSC5E2pZtyvWER5wO6HmB+d0LmtCpus8qRrCCW6OKrlz5XMhZLLGQK0S9gEZXDcR3z75eA6EWlZPUKuEOD0qZx58ToRMVfVphXANm6P8ywvQiZDxSkZjhfCEmqPOOtSLkFVM8DLhFhW3kJ5f0JUwLdunJUKYmhF+a9CdkPGSOVEi/AKpGfXtDehKKI5thHuUmqm1NjCEjBfvbRQJrc14R+EeG703YWnHKBC+gz6htjoGC0XIeMEvKxDOUZ+QdLXAmVAV/kHzhO8gx1747oSehGyU/4h5QtAq1CntUoE7oc6vxBwhSpGKAQnQg7CgTnOEqL2wvAV3QKhye+IfYR90DKOONW8NJmT8z4v6I1yCLFLulkoYhjC3Mv4Iw7Nlok9EQC9CrauEC9AkpeoZP0ImPyuEc5BTwcm3Jb0I/3b9O+EUZbDRL8d5Ef7ZUfcXQOkZZZd8Fp7wsTruhN+gSZo65dZPPweztzPTKifuJ21XuYczboRjlGPIHS7ZT35HlwO1SyWCvPg+eVMg9JsJNs+x5uupsIcJ4p8C4Tnk2DnRz/POrtL/DR0huuu46/9gk9TWZPvwrlLQLLdpeiUcoCapsLsaMQUA3t3SK+EbKgycfraBPeQb4Zne7MWMEBZiY3aXBpYYi5F/PAh3sAQ9q80C5bdd9+KMcAU7EuU29wVh9tTsQchgJ4ZW/j3qMEirOyEqTGoktQD8wJ3njW+EE1yerA0h7vHp9kaIW4ZWhEfYoXO2EC+EKJON2RHiUj+yWIYh7ANz2GwIYafOVzfYEK6B2dw2hDhNzuQiI1wCk9giE14cfQZVNLEJLwcYDLoOYhNeQhmGEHlrJDah7BtCoEXzAoRjQ4gKdmcSm9D4pwyXI5Q9ITKhWBpC1LFhJtEJj4YQdWCRSWxCdTCEsBjNRWIT6pMhRD4gPqEyhNA7hrEJGe8z1LHaVeIT7hkuhnCR6IRyzMb/7Vkq1wzpHb4C4YItoNe1oxOmn+zzP064Y7iIfvaA6IQTBgyWslcg7AUgVGmzjCwIhWwZICW+ntjSCdW81yjbrQVhb9s8QK83iU9IT+tqF9r7/QsIiUEWsw7JuhRMSAyyGF1K3g/BhMR4tdkPyTYNmPBIi1cbm4Zsl4IJf2m7Zbqg+xZgQu+8tqsY34LsH2IJqQ668Q/JPj6WcEOcYsbHJ8dpsITUzYz36bE2LCExLTSLtVHjpVhCYrw6i5dSY95YQmIWRRbzpp5bYAmJelAdA5w9QQmph5vZ2RP1/BBKSH257PyQ/M+EJKTmiWRnwNRzfCgh0e6+nuNTczGghES7+5aLQbz+CyUk2t23fBriXEcSUo3mW04UUV8hCal2d3rNa5vSchORhGS7+5qbSLS9kYR0uztEjjCSkGp333OEaSFTJCFxI3vkedOsGiQh1cG/5+rTdh0gITGGpEVyJyQtRCAhcR+7FgDJCEkLEUhIdOzS3oOQdHcNSEi8iZG7u0a6yS2GSb9ZLDiaf/tDUqX5+4e0O6SCN8v/LAj5qOnXRKcnf4cUdg845jl+4R4wqrBJTMJ7eRPwffyIhOKrQIiaphEJSzUVUNdKIhKW6mKg7uLGI6zUNgFdWI9HyO+drh8FcjD3HKMRqkfha3CdqGiENXWiMA+KRXh1nEqEEF0Ti7C2XhukdkMswtqae5Bb45EI8/W3coSIewmRCBtqXyLql8YhLBShzRMCmsvEISy0nCnWEQ7+rCiEqtDmokAY3sOIQlisJ1osaxi8GHQMwlJt7SJhcHUag7C1JnvwPTECYbkWZbk3QuCPGIGwXJqqXF40sHXaPWFaDlBXCqiG7UcW4RtWhi//IWyfmc4JLfrMhLXduiZU1S4M4H5PXRPWVMCr69kV0FHsmFDW3CSrK9X8E26edkuo6pp01/bOCzdPuyW07p0XsLdcp4R1feUaCJN5KOOtS8IaPdpMGOy0rUtCXX/g3EAYqmN1h4RNnaubyt4HKnzbHaFsSphoLOwfZil2RigaW0o1ty4IYoJ3RejTlzvZh9gVOyLU8qN5+OYnrwNom44IRxWPwoowmdARuyHkbYUNWluIDMkKtRPC9vaY7U1SVtSYRheEaXt7zCdtYA7EPaMDQlHXyNmeMPkhXviHE4o6j8mFMPklIcIJ1dMWIc+bFb1RENGE6vR8+OdvQPmKYEJh0eTFpuEUYS1iCZ+uQVvC5OC9aUAJ0yda1IEwWflu/UhCy1btlm3Rhp6RGyChbat228ZvvZHXe8AI9cimyJYLYbL26qiFItSyxZvwJEz2Zw+VCiIU52Z/0J8wSebu+gZDKF26YDs1YFw6O4wQwpHTLR23FpMb5jhTAYRKW3XJ8iQ0M9XtIkt4QnlwbKDs3CZ04hSgCk2o6s8mghIm+x8HxsCE8te9D71Pq9eetD5gDEqoWiNOjcN7/Cbpz22NuJCE/GDTxK06vM+PkmRxtnM3whGmzNqKKQ3v9zOzN3KbjSMUoeLeN1X9Wy73j/z5cgxDqPnKa4Jeh/f+ZZK8z58yhiBU/ODQVLg6POG3STI+PHGq6IRq9LN5Pkbb8KRfG8b270glNN+PxkcnNHP1KEXjO5IIteAryvy8DU8eweicgW6yAQiESqqBv37JDR9gDCOfB177Ib0JBf+xayX8fPgwwxhzdXCqgfQiNLPzPLB34p8NH2ogI5t/WBnSndDg6S+qdikMH3AsI5vhiae5JttuhFqn/DQMiZcEJzTyMZmpB6U9oVYpF/NesMn5N3zwES8y7s00N5uItiPUIuV6th1D3gVDeJH9YjA/21T+kOf5YOHu2doKjjATq+ot2FcAE76A/B+AkqZsznyRRgAAAABJRU5ErkJggg=="
                                        alt="facebook's logo"
                                        className="w-[30px] rounded-full"
                                    />
                                </a>
                                <a className="transition-transform duration-200 hover:scale-110">
                                    <img
                                        src="data:image/png;base64,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"
                                        alt="zalo's logo"
                                        className="w-[30px] rounded-full"
                                    />
                                </a>
                                <a className="transition-transform duration-200 hover:scale-110">
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEUAAAD////p6ent7e0wMDD6+vrf3981NTX09PSLi4vm5ubBwcHFxcXb29vx8fF/f39LS0u1tbUpKSmYmJilpaWRkZFVVVWenp4aGhpqampCQkI6Ojp1dXVYWFhgYGDU1NTOzs4TExO4uLghISEXFxeEhIRGRkZ3d3dlZWUQpGuhAAAKhklEQVR4nO2d22LiOgxFk0JCA4SSQqHXKZ0eOvP/X3ighZCLbEuyZGems9/60JAFiS3LW3KS/u1KYt+Auv4RCiobTfO8LMs8n46ycB+rTpjls3XxsBwnXY2XD8V6lquzahLmVbHpgfW1Kapc8S6UCBez4hEBd9FjMVvo3IoCYTbf35LozrrdzxWeWWnC0RrzYJq1WY+E70iUcLR98sL70tNWFFKOMKs+BPC+9FHJPa5ShK/PYnhfei6F7kyGsJoI8x01qUTuTYAwWyngfWkl8LB6Ey72anxH7b1nSU/C6xtVvqNuriMSZoU631GF17PqQ7gOwnfUOgrh/D4YYJLcz4MTjl4C8h31wg10mITbwHxHbQMS5v31bAiNWctIDuFdFL6j7oIQXmlEaFhNrvQJq4h8R5GDVSrh78iASfJblXAacg406X6qRziLDXfSTIsw3hjaFWVMJRD+iM3V0A8FwizmJNHXBL3ewBKOYiP1hI1TkYR5bB5AyBgOR/gamwbUqxzhLjaLQTspwl1sEqMwiAjCXWwOixCIbsJhvoNnud9FJ+EQR9GmnCOqi3B482BXrnnRQZjFvn+EHNGNgzBOQoamiQ/hkIJts+xhuJVwOMslu6yLKRvhUBa8btmWxBbCaez7JsiS2LAQDiEng9U9hzB+Vo0icwbOSKiZFwUnac/YwphHNRFeybDAghPXKhc1E6pmZeCb8fxI08RvINSdCWHCB8+rGmZFmFB5QQETen+r8DIDJlQOR2HCn76XHeMJtXd4YUL/CAPcJYYI1deEhmHP/8LQNAQRqpsQDIS+Q02SvOAI5wIMdhkIvV/EJAFMKQChfjxqnJy9BcSnfcIATicToYBHte+e6hGGyMyYCCWm4V7WpkcYwoxnNFT4ueA/VbgIr/0/wy0jYSlw8a5Zs0uo7xdNLIQCE0ZyYydc+H8CQmZCiVGg4yruEOpams+yGJsEsl97G2GgFLfNuiXwmrSH0zahnuu+Jas5zb8uZWUhFLh7jOz2O/+lm5kwlCvPTph5I7ayUi3CUJYZl4WSVrrYVytl0ySUmG9RcppEfQPUZs1UInhdtNw2WM/35RkmDLcbijD6XvkNqY0Jo0EYzv2LsjJ7rYcbY02DUK5A0iWkWbvilRMf9QERBvQkoO3or+wI55KTuhAGLBKhGO7L9QPnp7wkFi+EEkXKSJFLCq7zkoj51CcMaZyhF03QY7n6Ma0Jw5XahSGsU1I1oUCKBK0QhJsuYVDzUwjCetI/E+onuhsKQnhOf58Jw6QvTgpCeE5mnAn54QNDQQhv24RhcmxnBSE859xOhGENXmEIZy3CMIX1Z4UhLFqEvnkDmsIQPrYIFTAsAgkdVl9GeqpJGNiuDhKO7AWwDMK8QRi4uNdAmPxnYWQQVg3CsAONkfCgrelhZRAWDUK1sPvx9916vss7b4GF8BCLwOUFDMJNg9CbpK8f2/nFuNvZd7USJskL1OaDkwi/EEovLJ62HYsZjfCgm15vOg5hVhPKDqV3fQAy4UFP+6psYHII85pQMGa7/QndPYfwU+8/9uufuzIfserLZjWhWAbjzVAWwCb007omlJosjB1kIhEWNaGAA+KgR3MVWSTCh5pwKXE5W2lOJMJlTShhCba2qopEOK4JBS5m7zcSiTCRI/zP0RcvNqF3SHPvavwXizA7EXpf29m9MRbh6EToa5J39/yJRTg9EXqGpYiq/1iEuQghphVebEIvH80GutuhEJYShKheP527/6MIcW23OmNZcEKP9xDZkYqSp5GUwEiD7GPcMY0EJ+TPh5i+adms55cLPh/yr+3Egw8SCB7TsOPSFXSnF5Urg2E1eFzKXlvYZopXy775H7N6eoZu9EvrN9s/hidkrvGNPZpcxo7wa3xensbYi+KX6z/D52l4ubZeldhJ7u8rfK6Nly81PKSIfazw+VJezhsGxHxb4XPerH0LeNmEigDBWE+B8LJvwQpM4YgNNWiBiSsFwsveEyuoATeZcFtEYKSgQHjZP2RN+eBZPs6J4lPgr6/Qliq9EHL28cFHjfDJXck7Xpr7+JzpwuMuQUL5qqumF4Php3mD7hJX5wIHQ/JdRJt+GsYTAjaDwdVsPIKE8vbIpieKMdSAhDinMTyTyvuy0iYh3ZsIEuKKeOBVl3jNTtubSB9qbqG7xP2GcMgu3uug7S9lvAT83wE+vUm8k2jbI8zweUN3iXuX4A1xcS992+fNuD404+PmNHg3jnwDDnW8+ox6CzBqQ/0nCCgetHXrLeg1M2DkjQn/PqB/lC/a6dbM0JcXYLIU8yLCWVbxPobduid68A1uymC+KLj5n7SJt1e7xshkgDfqnljhmE18oOnXH9IXoHBNgfPf4LlCPO7u15DS64DBocb5JsLjjPhrCNQB0+PCX/C9OpKvBmvKOxfFIKiWm/6Ywvdq71xgqKgQX+BD9fj0ngqmU5ctFzLlyaULPsCeCvQFmul2zQ+q8T/8ePqC+2LQJ33T/Zq+LGPRj/jqF+5tQu9PY/Z7LYB+50tzUZ70usLQn4Y+J9m8JmWnz+vYYiIWT9GYegzR+0RZSyWvVpef5pf1xBvpn9DYJ4r+Olj2uT91vatWq/XMYc8Ub1hh7vVFH9I49a5dybdzaDO1/iL33KMeCgpJ/BAGW889+teJO93NJvlMsK1vIj2ZYTk6Ayf5XgfW3peMz+tcjyz51kb2/qWMvCzC5m2RfBc8Rw9aTh9hpAMTlEI7UVcfYan8Pk4KVfLOXtCc2Wk5IEBEP29OhAE17I8EiOjJzuqrz0LUaIH33v8YgJCTfX5EH0BcS6WXKO5sBNb5Fm+0A8/ThUq/W+T5FkzvjrUzSVdKrUawZ5Qw35AXVxViralSI1H0OTNs0zC8udvVtVbvfsJZQez05TucB29qodcphnLeEz/J/m5/HV9lSv9Bkc7s8mrtfWNaM462mn3viOeueZ6ddzPrjTrG8hIpUc/O8x7P35/X8+lnHJDl863+obTk8w+/wRmW3+Ac0m9wluzffx7wNzjT+Rucyx3uTA8feZ2tHrZFNFOOxberlDdkq3aezN2pcIShG3+SBS8oKIQKVQKScu8MuQnTXWwKixBbCgjCdBebwyjMngmGMN3FJjEItSmEIhzou4jbncURDnJEdY6iJMIBzouueZBKmGbDCuAm6G0ENOGwwnBk5x8i4YAWU5i+OBzCwSyJcc2pOITpdAi5m3vaNheNcAgZOKoNi0oYugV/T6RNPBZhehVz2pjQrYJ0wphjKmUM9SFMc4nGw3SNkXGaAGHQowRrYZpsyhGmI46dwUcv2DhUijBN59KFPDa9W5tpKxGGPFAQZxCQJ0yzMKe3FHQ7khShoq/iohu0iUWFME0Xuqfu7X3cqzKEh2dVwQZ70srr+RQjPKjSiOQm5BAUlAxhmpbSVsNnU3UjVVKEh4e1knOrfVQCj+dJcoTp0RIkUVvwtOWGL6BECVNTW128NmtRvFSe8KBsvue5u273vXOsBKRAeNRiVtAaMz0WM++ZD5YS4afyqsA8spuiYi38kNIk/FSWz9bFw7K/Zh4vH4r1LFd4LttSJ7woG03zvCzLPJ+O1LkuCkgYSf8I/3z9D3cig7vsOy59AAAAAElFTkSuQmCC"
                                        alt="tiktok's logo"
                                        className="w-[30px] rounded-full"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
