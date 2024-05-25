'use client';
import React from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { Search } from "lucide-react";

type Props = {
    onChange?: () => void | undefined;
};

const SearchInput = ({onChange}: Props) => {
    const [value, setValue] = React.useState<string>("");
    const router = useRouter();

    const handleSearch = (searchValue: string) => {
        const url = queryString.stringifyUrl(
            {
                url: "/search",
                query: {
                    content: searchValue,
                },
            },
            { skipNull: true, skipEmptyString: true },
        );
        router.push(url);
        if(onChange) onChange();
    };

    return (
        <div className="relative">
            <Input
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch(e.currentTarget.value);
                    }
                }}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="w-full rounded-md pl-9 focus-visible:ring-transparent"
                placeholder="Find post content..."
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
        </div>
    );
};

export default SearchInput;
