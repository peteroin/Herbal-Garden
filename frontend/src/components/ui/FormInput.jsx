/**
 * FormInput - Reusable form input component
 * Reduces code duplication across form pages
 */

export default function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  required = false,
  disabled = false,
  autoComplete = 'off',
}) {
  const hasError = error && touched;

  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-forest-900">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className={`rounded-lg border-2 px-4 py-2 text-forest-900 transition-colors focus:outline-none ${
          hasError
            ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
            : 'border-forest-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-100'
        } ${disabled ? 'bg-forest-100 text-forest-500' : 'bg-white'}`}
        aria-label={label}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
      />
      {hasError && (
        <span id={`${name}-error`} className="text-sm font-medium text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}
