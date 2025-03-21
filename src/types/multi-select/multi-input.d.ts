export interface MultiSelectProps {
    placeholder: string;
    inititalData?: TInitialData[] | null;
    onInputChange: (e: string) => void;
    onSelectedDataChange: (e: TInitialData[]) => void;
    options: TInitialData[];
}

export interface MultiInputProps {
    placeholder: string;
    inititalData?: TInitialData[] | null;
    onSelectedDataChange: (e: TInitialData[]) => void;
}

export type TInitialData = {
    label: string;
    value: string;
};
