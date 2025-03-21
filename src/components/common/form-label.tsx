import { FormLabel } from '../ui/form';

const FormCustomLabel = ({ isRequired = false, text }: { isRequired?: boolean; text: string }) => {
    return (
        <FormLabel className="text-sm font-semibold text-gray-600">
            {text} {isRequired && <span className="text-red-500">*</span>}
        </FormLabel>
    );
};

export default FormCustomLabel;
