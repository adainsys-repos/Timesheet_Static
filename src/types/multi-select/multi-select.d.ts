export interface MultiSelectProps {
    placeholder: string;
    inititalData?: TInitialData[] | null;
    onInputChange: (e: string) => void;
    onSelectedDataChange: (e: TInitialData[]) => void;
    onValueClick?: (e: TInitialData) => void;
    disabledInput?: boolean;
    options: TInitialData[];
}

export type TInitialData = {
    label: string;
    value: string;
};
