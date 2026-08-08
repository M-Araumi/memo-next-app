import { describe, expect, it } from "vitest";
import { validateMemo } from "../memoValidator";

describe("validateMemo", () => {
  it("正しいタイトル・本文の場合、バリデーションを通過する", () => {
    expect(() => validateMemo("テストタイトル", "テスト本文")).not.toThrow();
  });

  it("空のタイトルの場合、エラーになる", () => {
    expect(() => validateMemo("", "テスト本文")).toThrow();
  });

  it("空白のみのタイトルの場合、エラーになる", () => {
    expect(() => validateMemo("   ", "テスト本文")).toThrow();
  });

  it("40文字を超えるタイトルの場合、エラーになる", () => {
    const title = "あ".repeat(41);

    expect(() => validateMemo(title, "テスト本文")).toThrow();
  });

  it("空の本文の場合、エラーになる", () => {
    expect(() => validateMemo("テストタイトル", "")).toThrow();
  });

  it("250文字を超える本文の場合、エラーになる", () => {
    const memoText = "あ".repeat(251);

    expect(() => validateMemo("テストタイトル", memoText)).toThrow();
  });
});