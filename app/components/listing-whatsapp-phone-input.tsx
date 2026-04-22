"use client";

import { useMemo } from "react";
import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js/min";
import PhoneInput, { type Country, type Labels, getCountries } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en.json";
import "react-phone-number-input/style.css";

const PRIORITY_COUNTRIES: Country[] = ["IL", "BR", "PA", "EC"];

const HEBREW_COUNTRY_LABELS: Partial<Record<Country, string>> = {
  IL: "ישראל",
  BR: "ברזיל",
  PA: "פנמה",
  EC: "אקוודור",
};

type Props = {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  id?: string;
};

export function ListingWhatsappPhoneInput({ value, onChange, disabled, id }: Props) {
  const countries = useMemo(() => {
    const all = getCountries();
    const rest = all
      .filter((c) => !PRIORITY_COUNTRIES.includes(c))
      .sort((a, b) => (en[a] || a).localeCompare(en[b] || b, "en"));
    return [...PRIORITY_COUNTRIES, ...rest];
  }, []);

  const labels = useMemo((): Labels => {
    const merged: Labels = { ...en };
    for (const [code, label] of Object.entries(HEBREW_COUNTRY_LABELS)) {
      merged[code as Country] = label;
    }
    return merged;
  }, []);

  return (
    <div className="listing-whatsapp-phone-wrap" dir="ltr" lang="en">
      <PhoneInput
        id={id}
        international
        defaultCountry="IL"
        countries={countries}
        labels={labels}
        flags={flags}
        placeholder="Enter phone number"
        value={value}
        onChange={onChange}
        disabled={disabled}
        dir="ltr"
        limitMaxLength
        smartCaret
        countryCallingCodeEditable={false}
        className="listing-whatsapp-phone"
        numberInputProps={{
          dir: "ltr",
          inputMode: "numeric",
          autoComplete: "tel-national",
          className: "text-slate-900 placeholder:text-slate-400",
        }}
      />
    </div>
  );
}

/** Normalize stored DB value for controlled PhoneInput (E.164 or undefined). */
export function parseInitialWhatsappE164(stored: string | undefined): string | undefined {
  const t = stored?.trim();
  if (!t) return undefined;
  if (!isValidPhoneNumber(t)) return undefined;
  const p = parsePhoneNumberFromString(t);
  return p?.format("E.164");
}
