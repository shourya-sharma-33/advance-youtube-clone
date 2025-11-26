export const SearchInput = () => {
    return (
        <form className="flex max-w-[600px]">
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search"
                    className=" pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus:border-blue-500"
                />
            </div>
        </form>
    );
};
