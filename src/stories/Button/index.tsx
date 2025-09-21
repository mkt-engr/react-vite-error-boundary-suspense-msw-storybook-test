import "./index.css";
import { useCallApi } from "./useCallApi";

export interface ButtonProps {
  /** ページの主要なコールトゥアクションですか？ */
  primary?: boolean;
  /** 使用する背景色 */
  backgroundColor?: string;
  /** ボタンのサイズは？ */
  size?: "small" | "medium" | "large";
  /** ボタンの内容 */
  label: string;
  /** オプションのクリックハンドラ */
  onClick?: () => void;
}

/** ユーザーインタラクション用の主要UIコンポーネント */
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
