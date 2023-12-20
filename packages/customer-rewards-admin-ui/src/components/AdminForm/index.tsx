/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input } from './Input';

export interface FormLayout {
  columns: number;
  gap: string;
  align: 'start' | 'center' | 'end';
  submitButtonStyle: React.CSSProperties;
}

export interface Field {
  label: string;
  type: string;
  name: string;
  required?: boolean;
}

export interface AdminFormProps {
  fields: Field[];
  layout: FormLayout;
  formData: Record<string, any>; // ou um tipo mais específico se preferir
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (formData: any) => void; // ou um tipo mais específico se preferir
}

export const AdminForm: React.FC<AdminFormProps> = ({
  fields,
  layout,
  formData,
  onChange,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const gridClass = layout.columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1';

  return (
    <form onSubmit={handleSubmit} className={`max-w-full mx-auto p-4 ${gridClass}`}>
      {fields.map((field) => (
        <Input
          key={field.name}
          label={field.label}
          type={field.type}
          name={field.name}
          value={formData[field.name]}
          onChange={onChange}
          required={field.required || false}
        />
      ))}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
      >
        Submit
      </button>
    </form>
  );
};
