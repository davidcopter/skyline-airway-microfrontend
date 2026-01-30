# Skyline Airlines: Maintenance MVP Subsystems

The Maintenance MVP focuses on transitioning from manual, reactive processes to a streamlined, digital workflow. It is divided into three core subsystems.

---

## 1. Fleet Health & Airworthiness Subsystem

_The "Strategic Dashboard" for the entire fleet._

- **Tail Number Registry:** A master database of all aircraft including Model, Year, **Total Flight Hours (TFH)**, and **Total Cycles (TC)**.
- **Threshold Monitoring:** Automated tracking of "Time-Life" components. Systems will flag parts (e.g., engines or landing gear) that are approaching their mandatory service intervals.
- **Airworthiness Status:** A real-time "Go/No-Go" status for every aircraft based on pending critical maintenance or open defects.
- **Utilization Logging:** A simple interface for ground crews to input daily flight hours and landing cycles to ensure health data is current.

---

## 2. Defect & "Snag" Management Subsystem

_The "Reactive Engine" for handling unexpected technical issues._

- **Crew Reporting Portal:** A mobile-responsive interface for pilots and cabin crew to log "Snags" (e.g., "Right-side navigation light out") immediately upon landing.
- **Severity Categorization:** \* **AOG (Aircraft on Ground):** Critical; plane cannot fly.
  - **MEL (Minimum Equipment List):** Non-critical; can fly for a grace period.
  - **Deferred:** Cosmetic or non-essential maintenance.
- **Troubleshooting Logs:** A collaborative space for engineers to document tests performed and suspected root causes.
- **Digital Sign-off:** A formal "Corrective Action" field where certified technicians sign off on the fix, ensuring regulatory compliance.

---

## 3. Work Order & Job Card Subsystem

_The "Execution Engine" for scheduled maintenance and inspections._

- **Digital Job Card Library:** A repository of standardized procedures for routine inspections (e.g., "Check Tire Pressure" or "Replace Oil Filter").
- **Task Assignment:** A management tool to assign specific Job Cards to qualified engineering teams or individual technicians.
- **Inventory Integration:** A "Required Parts" section within each job card that checks real-time availability in the **Inventory Subsystem**.
- **Progress Tracking:** Real-time visibility into task status: `Scheduled` → `In Progress` → `Pending Inspection` → `Completed`.

---

### **Maintenance Workflow Integration**

1.  **Fleet Health** flags an upcoming 500-hour inspection.
2.  The **Work Order Subsystem** generates the necessary Job Cards and assigns a team.
3.  During the inspection, an engineer discovers a cracked seal and logs it in the **Defect Subsystem**.
4.  The defect is corrected, the log is signed off, and **Fleet Health** updates the aircraft status back to "Fully Airworthy."
