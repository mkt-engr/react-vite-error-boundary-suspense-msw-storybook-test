import { useCallApi } from "./useCallApi";

import "./index.css";

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  onClick,
  ...props
}: ButtonProps) => {
  const { handleClick, loading, error, success } = useCallApi();

  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";

  // ローディング状態に応じてラベルを変更
  const displayLabel = loading
    ? "Loading..."
    : success
      ? "Success!"
      : error
        ? "Error!"
        : label;

  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " "
      )}
      style={{ backgroundColor }}
      onClick={handleClick}
      disabled={loading}
      {...props}
    >
      {displayLabel}
    </button>
  );
};
