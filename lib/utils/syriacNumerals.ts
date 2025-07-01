// Syriac numeral mapping (alphabet to number)
export const syriacNumerals: Record<string, number> = {
  ܐ: 1,
  ܒ: 2,
  ܓ: 3,
  ܕ: 4,
  ܗ: 5,
  ܘ: 6,
  ܙ: 7,
  ܚ: 8,
  ܛ: 9,
  ܝ: 10,
  ܟ: 20,
  ܠ: 30,
  ܡ: 40,
  ܢ: 50,
  ܣ: 60,
  ܥ: 70,
  ܦ: 80,
  ܨ: 90,
  ܩ: 100,
  ܪ: 200,
  ܫ: 300,
  ܬ: 400,
};

// Syriac numeral system mapping
export const syriacTens: Record<number, string> = {
  10: "ܝ",
  20: "ܟ",
  30: "ܠ",
  40: "ܡ",
  50: "ܢ",
  60: "ܣ",
  70: "ܥ",
  80: "ܦ",
  90: "ܨ",
};

export const syriacOnes: Record<number, string> = {
  1: "ܐ",
  2: "ܒ",
  3: "ܓ",
  4: "ܕ",
  5: "ܗ",
  6: "ܘ",
  7: "ܙ",
  8: "ܚ",
  9: "ܛ",
};

// Convert Syriac numeral to number
export const syriacToNumber = (syriac: string): number => {
  let result = 0;
  for (let i = 0; i < syriac.length; i++) {
    const char = syriac[i];
    if (syriacNumerals[char]) {
      result += syriacNumerals[char];
    }
  }
  return result;
};

// Convert number to Syriac numeral
export const numberToSyriac = (num: number): string => {
  if (num <= 0) return "";

  // Handle 1-10: direct mapping
  if (num <= 10) {
    for (const [char, value] of Object.entries(syriacNumerals)) {
      if (value === num) return char;
    }
    return "";
  }

  // Handle 11-19: ܝܐ-ܝܛ
  if (num <= 19) {
    return "ܝ" + (syriacOnes[num - 10] || "");
  }

  // Handle 20-99: tens + ones
  if (num <= 99) {
    const tens = Math.floor(num / 10) * 10;
    const ones = num % 10;

    if (ones === 0) {
      return syriacTens[tens] || "";
    }
    return (syriacTens[tens] || "") + (syriacOnes[ones] || "");
  }

  // Handle 100-199
  if (num <= 199) {
    const remainder = num % 100;

    if (remainder === 0) return "ܩ";
    if (remainder <= 10) {
      for (const [char, value] of Object.entries(syriacNumerals)) {
        if (value === remainder) return "ܩ" + char;
      }
      return "ܩ";
    }
    if (remainder <= 19) return "ܩܝ" + (syriacOnes[remainder - 10] || "");

    const tens = Math.floor(remainder / 10) * 10;
    const ones = remainder % 10;

    if (ones === 0) return "ܩ" + (syriacTens[tens] || "");
    return "ܩ" + (syriacTens[tens] || "") + (syriacOnes[ones] || "");
  }

  // Handle 200+: ܪ + remainder
  if (num <= 999) {
    const hundreds = Math.floor(num / 100) * 100;
    const remainder = num % 100;

    let result = "";

    // Add hundreds
    if (hundreds === 200) result = "ܪ";
    else if (hundreds === 300) result = "ܫ";
    else if (hundreds === 400) result = "ܬ";
    else if (hundreds > 400) {
      // For larger hundreds, use ܬ multiple times
      const hundredsCount = Math.floor(hundreds / 400);
      result = "ܬ".repeat(hundredsCount);
      const remainingHundreds = hundreds % 400;
      if (remainingHundreds === 200) result += "ܪ";
      else if (remainingHundreds === 300) result += "ܫ";
    }

    // Add remainder
    if (remainder > 0) {
      result += numberToSyriac(remainder);
    }

    return result;
  }

  return "";
};

// Check if string contains Syriac characters
export const containsSyriac = (str: string): boolean => {
  return /[\u0700-\u074F]/.test(str);
};
