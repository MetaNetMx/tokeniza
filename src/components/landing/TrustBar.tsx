import { Shield, ShieldCheck } from "lucide-react";

const regulators = [
  "CNV Argentina",
  "CNBV México",
  "CNMV España",
  "CVM Brasil",
  "CMF Chile",
];

const auditors = [
  "CertiK",
  "OpenZeppelin",
  "Hacken",
];

const TrustBar = () => {
  return (
    <section className="border-y border-border bg-secondary/30 py-6">
      <div className="container mx-auto px-4 space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Regulado por</span>
          {regulators.map((name) => (
            <div key={name} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Auditado por</span>
          {auditors.map((name) => (
            <div key={name} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
