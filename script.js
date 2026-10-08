/* =========================================
   FILE UPLOAD
========================================= */

const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");

if (fileInput) {

    fileInput.addEventListener("change", function () {

        if (fileInput.files.length > 0) {

            const file = fileInput.files[0];

            fileName.textContent =
                "Selected: " + file.name;

        }

    });

}


/* =========================================
   CONTRACT ANALYSIS
========================================= */

const riskItems =
    document.querySelectorAll(".risk-item");

const analysisContent =
    document.getElementById("analysisContent");


const riskData = {

    liability: {

        severity: "CRITICAL RISK",

        badge: "critical",

        title: "Unlimited Liability",

        section: "Section 12 · Limitation of Liability",

        confidence: "96% confidence",

        explanation:
            "The vendor's liability is unlimited. This creates potentially uncapped financial exposure for the company.",

        requirement:
            "Vendor liability must be capped at the total fees paid under the agreement.",

        contract:
            "Unlimited",

        standard:
            "Fee-based cap",

        original:
            "shall be unlimited for all claims,",

        suggested:
            "shall not exceed the total fees paid under this Agreement,"

    },


    ip: {

        severity: "CRITICAL RISK",

        badge: "critical",

        title: "IP Ownership",

        section: "Section 18 · Intellectual Property",

        confidence: "94% confidence",

        explanation:
            "The contract gives the vendor ownership of intellectual property created during the engagement.",

        requirement:
            "The company must retain ownership of deliverables created specifically for the company.",

        contract:
            "Vendor ownership",

        standard:
            "Company ownership",

        original:
            "shall remain the sole property of Vendor.",

        suggested:
            "shall be owned exclusively by the Company."

    },


    payment: {

        severity: "HIGH RISK",

        badge: "high",

        title: "Payment Terms",

        section: "Section 7 · Payment Terms",

        confidence: "91% confidence",

        explanation:
            "The contract requires payment within 90 days, which exceeds the company's approved 30-day payment period.",

        requirement:
            "Payment terms must not exceed thirty (30) days.",

        contract:
            "90 days",

        standard:
            "30 days",

        original:
            "ninety (90) days",

        suggested:
            "thirty (30) days"

    },


    renewal: {

        severity: "HIGH RISK",

        badge: "high",

        title: "Automatic Renewal",

        section: "Section 9 · Renewal",

        confidence: "89% confidence",

        explanation:
            "The agreement automatically renews for five years, creating a long-term commitment without an explicit renewal decision.",

        requirement:
            "Automatic renewal must be limited and require advance notice.",

        contract:
            "5-year renewal",

        standard:
            "Controlled renewal",

        original:
            "five (5) years",

        suggested:
            "one (1) year with 60 days' notice"

    },


    privacy: {

        severity: "MEDIUM RISK",

        badge: "medium",

        title: "Data Protection",

        section: "Section 21 · Data Protection",

        confidence: "86% confidence",

        explanation:
            "The data protection language only requires commercially reasonable safeguards and does not contain the company's required data-processing obligations.",

        requirement:
            "Vendor must comply with the company's approved Data Processing Agreement.",

        contract:
            "Generic safeguards",

        standard:
            "Approved DPA",

        original:
            "commercially reasonable measures",

        suggested:
            "the Company's approved Data Processing Agreement"

    }

};


/* =========================================
   DISPLAY SELECTED RISK
========================================= */

riskItems.forEach(function(item) {

    item.addEventListener("click", function() {

        /* Remove selection */

        riskItems.forEach(function(other) {
            other.classList.remove("selected");
        });

        /* Select current */

        item.classList.add("selected");

        /* Get risk */

        const risk =
            riskData[item.dataset.risk];

        /* Update analysis */

        updateAnalysis(risk);

        /* Scroll to contract clause */

        scrollToClause(item.dataset.risk);

    });

});


function updateAnalysis(risk) {

    analysisContent.innerHTML = `

        <span class="risk-badge ${risk.badge}">
            ${risk.severity}
        </span>

        <h2>${risk.title}</h2>

        <div class="section-number">
            ${risk.section}
        </div>


        <div class="analysis-block">

            <h3>Why was this flagged?</h3>

            <p>
                ${risk.explanation}
            </p>

        </div>


        <div class="playbook-rule">

            <div class="rule-icon">
                ⚖
            </div>

            <div>

                <span>
                    PLAYBOOK REQUIREMENT
                </span>

                <p>
                    ${risk.requirement}
                </p>

            </div>

        </div>


        <div class="deviation">

            <h3>
                Deviation detected
            </h3>

            <div class="deviation-row">

                <span>Contract</span>

                <strong>
                    ${risk.contract}
                </strong>

            </div>

            <div class="deviation-row">

                <span>Company Standard</span>

                <strong>
                    ${risk.standard}
                </strong>

            </div>

        </div>


        <div class="suggestion">

            <div class="suggestion-title">

                <h3>
                    Suggested Redline
                </h3>

                <span>
                    AI Generated
                </span>

            </div>


            <div class="redline-text">

                ${risk.title}

                <del>
                    ${risk.original}
                </del>

                <ins>
                    ${risk.suggested}
                </ins>

            </div>

        </div>


        <div class="redline-actions">

            <button
                id="rejectButton"
                class="reject-button"
            >
                Reject
            </button>

            <button
                id="acceptButton"
                class="accept-button"
            >
                ✓ Accept Redline
            </button>

        </div>

    `;


    setupRedlineButtons();

}


/* =========================================
   SCROLL TO CONTRACT CLAUSE
========================================= */

function scrollToClause(risk) {

    const clauseMap = {

        liability: "liabilityClause",

        ip: "ipClause",

        payment: "paymentClause",

        renewal: "renewalClause",

        privacy: "privacyClause"

    };


    const clause =
        document.getElementById(clauseMap[risk]);


    if (clause) {

        clause.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }

}


/* =========================================
   REDLINE BUTTONS
========================================= */

function setupRedlineButtons() {

    const acceptButton =
        document.getElementById("acceptButton");

    const rejectButton =
        document.getElementById("rejectButton");


    if (acceptButton) {

        acceptButton.addEventListener(
            "click",
            function() {

                acceptButton.textContent =
                    "✓ Redline Accepted";

                acceptButton.style.background =
                    "#3d9763";

            }
        );

    }


    if (rejectButton) {

        rejectButton.addEventListener(
            "click",
            function() {

                rejectButton.textContent =
                    "Redline Rejected";

                rejectButton.style.color =
                    "#c74e4e";

                rejectButton.style.borderColor =
                    "#e3b1b1";

            }
        );

    }

}


setupRedlineButtons();