import React, {ChangeEvent} from "react";

interface NameFilterProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    id: string;
}

const NameFilter: React.FC<NameFilterProps> = ({searchTerm, setSearchTerm, id}) => {
    const inputId = `nameFilter-${id}`;
    return (
        <div className="flex flex-col">
            <label htmlFor={inputId} className="w-full text-center font-medium">Name</label>
            <input
                id={inputId}
                type="text"
                className="rounded-lg w-full py-0 px-2 placeholder-gray-400 bg-background-lightest border-black focus:ring-primary-button focus:border-primary-button"
                placeholder="Search by name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                value={searchTerm}
            />
        </div>
    );
};

export default NameFilter;
