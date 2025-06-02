import React, { useState } from "react";
import Layout from "../components/common/Layout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import AuditCard from "../components/audit/AuditCard";
import AuditDetails from "../components/audit/AuditDetails";
import { generateAuditResults, sites } from "../services/mockData";
import { AuditResult } from "../types";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Dialog } from "../components/ui/Dialog";

const COLORS = ["#F97316", "#FACC15", "#22C55E", "#3B82F6"];
const data = [
  { name: "Performances", value: 51 },
  { name: "Accessibilité", value: 89 },
  { name: "Bonnes pratiques", value: 100 },
  { name: "SEO", value: 82 },
];


const AuditPage: React.FC = () => {
  const [selectedAudit, setSelectedAudit] = useState<AuditResult | null>(null);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testStep, setTestStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedSiteId, setSelectedSiteId] = useState<string>("");

  const auditResults = generateAuditResults();

  const handleAuditClick = (audit: AuditResult) => {
    setSelectedAudit(audit);
  };

  const handleBackToAudits = () => {
    setSelectedAudit(null);
  };

  const handleNewAudit = () => {
    setShowAuditModal(true);
    setIsTesting(false);
    setTestStep(0);
    setShowResult(false);
    setSelectedSiteId("");
  };

  const startTest = () => {
    if (!selectedSiteId) return;

    setIsTesting(true);
    setTestStep(0);
    const steps = [
      "Analyse des performances",
      "Vérification de l'accessibilité",
      "Audit SEO",
      "Analyse des bonnes pratiques",
    ];

    const interval = setInterval(() => {
      setTestStep((prev) => {
        if (prev + 1 < steps.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowResult(true), 1000);
          return prev;
        }
      });
    }, 1000);
  };

  if (selectedAudit) {
    return (
      <Layout>
        <AuditDetails audit={selectedAudit} onBack={handleBackToAudits} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="fade-in">
        <DashboardHeader
          title="Créer un rapport Lighthouse"
          description="Analysez les performances, l’accessibilité, les bonnes pratiques et le SEO de vos pages web."
          onAddClick={handleNewAudit}
          addButtonText="Analyser le chargement de page"
        />

        <Dialog open={showAuditModal} onOpenChange={setShowAuditModal}>
          <div className="bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto">
            {!isTesting && !showResult && (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Étape 1 : Choisir un site
                </h2>
                <select
                  className="w-full p-2 border rounded mb-6"
                  value={selectedSiteId}
                  onChange={(e) => setSelectedSiteId(e.target.value)}
                >
                  <option value="">-- Sélectionnez un site --</option>
                  {sites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.name} ({site.url})
                    </option>
                  ))}
                </select>

                <h2 className="text-xl font-semibold mb-4">
                  Paramètres d’audit Lighthouse
                </h2>
                <h3 className="text-lg font-semibold mb-2">Mode</h3>
                <div className="flex gap-4">
                  <label>
                    <input type="radio" name="mode" defaultChecked /> Navigation
                    (par défaut)
                  </label>
                  <label>
                    <input type="radio" name="mode" /> Période
                  </label>
                  <label>
                    <input type="radio" name="mode" /> Instantané
                  </label>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-2">Appareil</h3>
                <div className="flex gap-4">
                  <label>
                    <input type="radio" name="device" /> Mobile
                  </label>
                  <label>
                    <input type="radio" name="device" defaultChecked />{" "}
                    Ordinateur
                  </label>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-2">Catégories</h3>
                <div className="grid grid-cols-2 gap-4">
                  <label>
                    <input type="checkbox" defaultChecked /> Performances
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked /> Accessibilité
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked /> Bonnes pratiques
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked /> SEO
                  </label>
                </div>

                <div className="text-right mt-6">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                    onClick={startTest}
                    disabled={!selectedSiteId}
                  >
                    Lancer le test
                  </button>
                  <button
                    className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setShowAuditModal(false)}
                  >
                    Fermer
                  </button>
                </div>
              </>
            )}

            {isTesting && !showResult && (
              <div className="text-center">
                <p className="text-lg mb-4">Étape {testStep + 1} sur 4...</p>
                <p>Analyse en cours...</p>
              </div>
            )}

            {showResult && (
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Résultats du test</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-6">
                  <button
                    className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setShowAuditModal(false)}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </div>
        </Dialog>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {auditResults.map((audit) => (
            <AuditCard
              key={audit.id}
              audit={audit}
              onClick={handleAuditClick}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AuditPage;
