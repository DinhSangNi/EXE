type Props = { className?: string };

const ConciergeBellIcon = ({ className }: Props) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
                <path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z" />
                <path d="M20 16a8 8 0 1 0-16 0" />
                <path d="M12 4v4" />
                <path d="M10 4h4" />
            </svg>
        </div>
    );
};

export default ConciergeBellIcon;
