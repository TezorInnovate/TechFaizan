// src/data/projectsData.js

export const projectsData = [
  {
    id: "AI Firefighting Rover",
    title: "AI-based Autonomous Firefighting Rover",
    category: "Computer Vision / Hardware Design",
    year: "2026",
    thumbnail: "/images/ai-rover/rover.jpeg",
    heroImage: "/images/ai-rover/rover.jpeg",
    githubLink: "https://github.com/TezorInnovate/Autonomous-Firefighting-Rover",
    prototypeLink: "",
    
    // RECRUITER SUMMARY - Technical implementation highlights only
    summary: {
      tagline: "Real-time Yolov8 model for detecting fires, and performing subsequent actions to extinguish it via hardware designed for rover.",
      
      keyTechnologies: [
        "YOLOv8 (nano) for fire classification",
        "Ultrasonic & IR sensor fusion for enhanced detection",
        "Esp32 based microcontrol for actuation and WiFi connectivity",
        "Modular software design for seamless integration",
        "Output logging for explainability"
      ],
      
      technicalHighlights: [
        {
          title: "Detection Pipeline",
          description: "Fine tuned and trained Yolov8 model using a fires dataset from Roboflow. Focus on small fores for prototype testing and validation. Model metrics ~87.5% Precision and ~78.1% Recall."
        },
        {
          title: "Identity Tracking",
          description: "Integrated Deep SORT for persistent object tracking across frames using Kalman filters for motion prediction and appearance embeddings for data association via Hungarian matching."
        },
        {
          title: "Motion Analytics",
          description: "Built cumulative spatial heatmap system using floating-point grids updated by tracked object centroids, visualizing movement patterns over time."
        },
        {
          title: "Behavioral Analysis",
          description: "Developed rule-based temporal persistence logic to detect loitering events based on spatial confinement thresholds."
        },
        {
          title: "Deployment",
          description: "Deployed as a hardware based rover with software design for full pipeline testing."
        }
      ],
      
      metrics: [
        "Precision: ~87.5%",
        "Recall: ~78.1%",
        "mAP50: 0.853",
        "mAP50-95: 0.508"
      ],
      
      architecture: "Modular pipeline: Video Inference → YOLOv8 Fire Detection → Decision Logic → Fire Localization → Approach Fire → Run Extinguish Logic → Re-Run Detection",
      
      // Select which images to showcase (image path + title)
      showcaseImages: [
        {
          image: "/images/ai-rover/rover.jpeg",
          title: "Hardware Prototype"
        },
        {
          image: "/images/ai-rover/software.jpeg",
          title: "Software Layout"
        }
      ]
    },
    
    // Full detailed sections for ProjectDetail.jsx
    sections: [
      {
        id: "overview",
        title: "Overview",
        image: "/images/ai-vision/overview.webp",
        content:
          "This project focuses on the design and development of a real-time video surveillance system with the capability of detecting, tracking, and analyzing movement in real-time video feeds. The project integrates object detection using deep learning algorithms (YOLOv8), tracking of multiple objects (Deep SORT), and movement heatmap analytics. The project's aim goes beyond object detection; it also focuses on tracking moving objects, visualization of movement, and practical application in real-world scenarios."
      },
      {
        id: "problem",
        title: "Problem Statement & Motivation",
        image: "/images/ai-vision/problem.webp",
        content:
          "Traditional motion detection systems rely heavily on background subtraction or frame differencing, which are ineffective under changing conditions of illumination, shadows, camera noise, and background movement. In practical surveillance scenarios, such as corridors, classrooms, offices, or public areas, these systems lead to high false positives and low situational awareness. Simultaneously, there are numerous modern systems that detect objects but do not track them over time, causing loss of identity, and systems that track but do not understand the semantics of the scene. The need for this project was to develop a unified system that can detect what is moving, where it is moving, and for how long, with high performance."
      },
      {
        id: "goals",
        title: "Design Goals",
        image: "/images/ai-vision/goals.webp",
        content:
          "The system was designed around four core goals: " +
          "(1) Near real-time performance under constrained hardware and network conditions, " +
          "(2) Stable multi-object tracking with minimal identity switches, " +
          "(3) Interpretable motion analytics through cumulative heatmaps, " +
          "(4) Modular deployment via a lightweight web interface. " +
          "All architectural decisions from model selection to visualization were evaluated against these constraints."
      },
      {
        id: "architecture",
        title: "System Architecture",
        image: "/images/ai-vision/architecture.webp",
        content:
          "The pipeline follows a modular and sequential structure. The video frames received are first processed by the YOLOv8 model to detect objects in the video feed. The detected objects' bounding boxes are then fed into the Deep SORT model, which utilizes Kalman filtering and appearance embeddings to keep track of the objects' identities over time. The tracking information is then used to construct a cumulative heatmap representing the areas with the most movement. Finally, the video feed and other relevant information are streamed in real time via a Flask-based web interface."
      },
      {
        id: "detection",
        title: "Object Detection Strategy",
        image: "/images/ai-vision/detection.webp",
        content:
          "For the purpose of object localization and classification in a single pass, the YOLOv8 model's nano variant was selected for its advantageous balance of speed and accuracy. Additionally, the model's ability to utilize the COCO weights for the detection of human objects without the need for training on a custom dataset was a major consideration. A confidence threshold was also used for filtering out low-confidence detections."
      },
      {
        id: "tracking",
        title: "Multi-Object Tracking & Identity Preservation",
        image: "/images/ai-vision/tracking.webp",
        content:
          "In order to maintain consistent identity in each frame, Deep SORT was integrated with YOLOv8. Deep SORT makes use of Kalman Filter-based motion prediction in combination with appearance-based embeddings and Hungarian matching. This significantly reduces identity swaps during occlusions and re-entries. This allows reasoning about object persistence, loitering, and movement."
      },
      {
        id: "motion-analysis",
        title: "Motion Analysis & Heatmap Generation",
        image: "/images/ai-vision/heatmap.webp",
        content:
          "Apart from mere detection and tracking, the system also introduces a motion heatmap layer. In this case, spatial activities are accumulated over a certain period of time. The detected objects contribute to a floating-point heatmap grid in proportion to their centroid position. Over a series of frames, areas with frequent traversal are identified as hotspots. This provides an interpretable visualization of movement patterns, which can be useful for security monitoring, space utilization analysis, or behavioral insights."
      },
      {
        id: "threat-logic",
        title: "Behavioral Analysis & Threat Logic",
        image: "/images/ai-vision/threat-logic.webp",
        content:
          "A lightweight rule-based behavior analysis was also implemented on top of tracking and motion information. Objects that remain in a confined region of space after a temporal threshold are identified as possible loitering behavior. This temporal persistence-based approach prioritizes interpretability over more sophisticated learned models, demonstrating the power of low-level vision features in being promoted to security relevance."
      },
      {
        id: "deployment",
        title: "Deployment & Web Interface",
        image: "/images/ai-vision/deployment.webp",
        content:
          "The system can be deployed through a web server based on Flask, which sends a browser-compatible video stream with real-time overlays for detections, tracking IDs, and heatmaps. Other endpoints provide JSON-based access to motion statistics and alert states through REST APIs. The validation of the system was done through local environments and GPU-enabled cloud environments."
      },
      {
        id: "results",
        title: "Results & Performance Evaluation",
        image: "/images/ai-vision/results.webp",
        content:
          "The performance of the system was also tested under real-time conditions in the absence of ground truth annotations. In the GPU-backed environment, the system was able to provide stable performance with a frame rate between 12 FPS and 18 FPS, with end-to-end latency between 90 ms and 130 ms. The difference in latency was mostly because of the transmission aspect. The inference latency was consistently low at around 25-35 ms per frame. The confidence in person detection was also analyzed, which revealed that most of the detection confidence was above 0.70. Loitering detection was also found to happen after temporal persistence."
      },
      {
        id: "limitations",
        title: "Limitations",
        image: "/images/ai-vision/limitations.webp",
        content:
          "The system also uses heuristic, rule-based behavioral logic, which can sometimes result in false positives in uncertain or highly congested scenes. The accumulation of the heatmap does not currently have temporal decay, which could result in over-weighting past movement. The performance of the system also depends on the location of the cameras, the density of the scenes, and the accuracy of the detectors. These limitations were necessary to ensure interpretability and real-time responsiveness."
      },
      {
        id: "future",
        title: "Future Directions & Impact",
        image: "/images/ai-vision/future.webp",
        content:
          "The upcoming versions of this approach could replace heuristic threat logic with learned temporal anomaly detection models. The addition of temporal decay and semantic zoning would further improve heatmap analytics. Finally, it is important to note that this project shows how existing computer vision pipelines can be used to improve surveillance intelligence from raw detection to something deployable and interpretable, thereby building a solid base for surveillance intelligence."
      }
    ]
  },

  {
    id: "AI-based Autonommous Surveillance Drone",
    title: "AEGIS-X: Adaptive Explainable Ground-Integrated Surveillance UAV",
    category: "System Security / Data Sanitization",
    year: "2025-26",
    thumbnail: "/images/aegisx/logo2.jpg",
    heroImage: "/images/aegisx/logo2.jpg",
    githubLink: "",
    prototypeLink: "",
    
    // RECRUITER SUMMARY - Technical implementation highlights only
    summary: {
      tagline: "An autonommus surveillance system for drones. Integrated technologies for a new defense system.",
      
      keyTechnologies: [
        "AI Computer vision for perception",
        "Flight Controller BotWing F722 for flight control",
        "Raspberry Pi 4B for AI compute and command control",
        "Tof, GPS, Acoustic, and IMU Sensor data parsing",
        "Risk Learninng algorithm for evolving flight data",
        "Reasoning and Threat classification based on perception"
      ],
      
      technicalHighlights: [
        {
          title: "AI Perception Module",
          description: "A fusion of Vision data and multi-sensor feed parsing for extensive detection. The data runs through trained Yolov8/RT-DETR models for AI based decision making."
        },
        {
          title: "Reasoning & Threat Classification",
          description: "With the use of light weight MLP model and rule based control the software can estimate risk of certain activities and flag high risk scene for monitoring."
        },
        {
          title: "Planning & Explainability",
          description: "Common path planning algorithms such as A* and RRT* combined for more efficient path planning. Constraints for path planning are decided based on behaviour analysis and rule based decisions. Explainabilty implemented via rule tracing, path scoring, and feature importance."
        },
        {
          title: "Control Layer Design",
          description: "MAVLink and PX4 software integration for PID control and actuators. There is a connection of Raspberry Pi and the F722 flight controller for bi-directional telemetry."
        },
        {
          title: "Learning & Memory",
          description: "Implements persistent risk memory that updates with each flight to allow for self-supervised adaptation from flight scenarios. Logging done in SQLite and JSON files."
        }
      ],
      
      metrics: [
        "",
        "",
        "",
        "",
        ""
      ],
      
      architecture: "Modular workflow: Flight Arming → Toggle to Auto-mode → Sensors + Vision Activated → AI Pereption → Risk Modelling → Explainable Planning → Surveillance loop execution → Learning from flights",
      
      // Select which images to showcase (image path + title)
      showcaseImages: [
        {
          image: "/images/aegisx/drone.jpeg",
          title: "Hardware Drone Design"
        },
        {
          image: "/images/aegisx/architecture.webp",
          title: "System Software Layout"
        },
        
        {
          image: "/images/aegisx/poster.jpeg",
          title: "Project Plan Poster"
        },
        {
          image: "/images/agisx/novelty.webp",
          title: "Explainability Output"
        }
      ]
    },
    
    // Full detailed sections for ProjectDetail.jsx
    sections: [
      {
        id: "overview",
        title: "Overview",
        image: "/images/octawipe/overview.webp",
        content:
          "OctaWipe provides a secure and cross-platform solution for data erasure that can be used to promote safe IT asset recycling and reuse. The OctaWipe system was developed in accordance with various international standards on data destruction and provides a one-click user interface for secure data erasure from storage devices while ensuring forensic unrecoverability. The OctaWipe solution targets various users, including individuals, enterprises, and e-waste processors who require secure and verifiable wiping methods for their data."
      },
      {
        id: "context-problem",
        title: "Context, Motivation & Problem Statement",
        image: "/images/octawipe/problem.webp",
        content:
          "The problem of e-waste is growing at a very fast rate in India, with millions of devices being stored or discarded early because of the fear of exposing the data. Many people, organizations, and recycling centers avoid reselling or reusing these devices because they cannot ensure the complete removal of the sensitive information. The current methods of removing data are highly fragmented, platform-dependent, and require technical expertise, which is a major hindrance.\n\n" +
          "Currently, the greater part of the prevailing data destruction solutions is suffering from the aforementioned systemic issues. A substantial number of the solutions lack cross-platform compatibility, making them impractical and ineffective in heterogeneous environments. Others lack independent and verifiable evidence of sanitization, making the user and organization in question forced to employ an opaque wiping process without guarantees.\n\n" +
          "In large-scale enterprise settings, there are additional issues that come into play to efficiently sanitize a large number of devices. Bulk wiping a large number of devices can be a slow and laborious process. The problem is further compounded by modern storage media, such as SSDs and NVMe drives, where traditional overwriting methods do not suffice and forensic recoverability is a valid concern. OctaWipe was developed to address the usability, scale, verification, and trust issues within a single standards-based solution."
      },
      {
        id: "goals",
        title: "Design Goals",
        image: "/images/octawipe/goals.webp",
        content:
          "The system was designed around four primary goals: " +
          "(1) Full compliance with NIST 800-88 and DoD 5220.22-M data sanitization standards, " +
          "(2) Cross-platform usability across Windows, Linux, and Android environments, " +
          "(3) Support for bulk and network-based wiping at enterprise scale, " +
          "(4) Generation of tamper-proof, verifiable wiping certificates. " +
          "All architectural and tooling decisions were guided by these constraints."
      },
      {
        id: "architecture",
        title: "System Architecture",
        image: "/images/octawipe/architecture.webp",
        content:
          "OctaWipe has a modular architecture that uses a boot-independent wiping environment. Its operation starts by using a web-based or local portal, followed by a bootable execution using USB, ISO, and PXE Network Boot. Once executed, the device detects the storage devices, applies the wiping method, and then creates a digitally signed certificate that includes the logs and the metadata."
      },
      {
        id: "sanitization",
        title: "Disk Detection & Sanitization Engine",
        image: "/images/octawipe/sanitization.webp",
        content:
          "Essentially, the core idea behind OctaWipe is the implementation of various sanitization methods, depending on the storage devices being used. For instance, when dealing with HDD devices, the tool supports both multi-pass and single-pass overwriting using the shred method. On the other hand, the tool uses ATA Secure Erase, blkdiscard, nvme-cli, and even cryptographic erase methods when dealing with SSD and NVMe devices. The tool also supports the wiping of HPA and DCO sectors."
      },
      {
        id: "boot",
        title: "Bootable & Network Deployment",
        image: "/images/octawipe/boot.webp",
        content:
          "To overcome the OS dependency, OctaWipe supports execution on Live USB, ISO, and PXE Network Boot. The advantage of using PXE Boot is that it allows one-click wiping of multiple machines, which is especially useful for enterprises and e-waste recycling centers. The execution environment is provided by Ubuntu 24.04 LTS."
      },
      {
        id: "verification-trust",
        title: "Verification, Certification & Tamper-Proof Trust Layer",
        image: "/images/octawipe/certification.webp",
        content:
          "Verification is treated as a first-class system component in OctaWipe rather than a post-process add-on. After sanitization, the system performs automated verification checks to ensure that the selected wiping standard has been correctly applied. These checks validate completion status, method integrity, and device-specific parameters, ensuring that no partial or silent failures go unnoticed.\n\n" +
          "Once verification is complete, OctaWipe generates digitally signed wiping certificates in both human-readable (PDF) and machine-readable (JSON) formats. Each certificate contains detailed metadata including device identifiers, storage type, applied wipe method, execution logs, timestamps, and cryptographic signatures. This enables both operational confirmation and long-term auditability.\n\n" +
          "To eliminate the risk of certificate tampering or forgery, OctaWipe introduces an additional immutable trust layer using blockchain anchoring. Rather than storing full certificates on-chain, cryptographic hashes of the signed wipe reports are anchored to a distributed ledger. This design preserves privacy while ensuring that any future alteration of a certificate can be independently detected.\n\n" +
          "By decoupling verification from centralized servers, the system avoids single points of failure and long-term dependency risks. The result is a robust trust architecture where wiping claims can be validated years later, even outside the original operational environment. This layered approach balances transparency, privacy, and durability without introducing unnecessary blockchain overhead."
      },
      {
        id: "standards",
        title: "Standards Compliance",
        image: "/images/octawipe/standards.webp",
        content:
          "OctaWipe adheres strictly to globally recognized data sanitization standards, including NIST 800-88, DoD 5220.22-M (E), and DoD 5220.22-M (ECE). These standards ensure that data is rendered unrecoverable using both software based and forensic techniques, making the solution suitable for regulated industries."
      },
      {
        id: "novelty",
        title: "Novelty & Innovation",
        image: "/images/octawipe/novelty.webp",
        content:
          "OctaWipe's novelty lies not in inventing new wiping algorithms, but in integrating existing, proven techniques into a cohesive, verifiable system. The combination of PXE-based bulk wiping, storage-aware sanitization methods, and cryptographically verifiable certificates is rarely seen in a single platform. Most existing tools focus either on wiping or reporting; OctaWipe treats verification as a first-class system component. This integration-first design enables scalability, auditability, and trust without sacrificing usability, making the solution suitable for both enterprise and field deployment scenarios."
      },
      {
        id: "impact-future",
        title: "Impact, Benefits & Future Scope",
        image: "/images/octawipe/future.webp",
        content:
          "OctaWipe addresses a critical trust deficit in the IT asset disposal and reuse lifecycle. By providing verifiable, tamper-resistant proof of data destruction, the system enables devices to be safely resold, refurbished, or recycled without fear of residual data leakage. This directly reduces unnecessary hardware disposal and supports circular economy practices, particularly in regions facing severe e-waste challenges.\n\n" +
          "For enterprises, OctaWipe significantly lowers compliance risk and operational overhead during large-scale decommissioning workflows. Automated verification, bulk wiping via PXE, and standardized certification streamline audit readiness and reduce reliance on manual reporting. For individuals and e-waste handlers, the system restores confidence that sensitive personal or organizational data has been permanently erased using recognized standards.\n\n" +
          "Looking ahead, future development will focus on deeper automation, intelligence, and ecosystem integration. Planned enhancements include policy-driven wipe recommendations based on device type, storage technology, and regulatory context, as well as tighter integration with enterprise asset management and ITSM systems. Expanded support for mobile, embedded, and IoT-class devices will further broaden applicability.\n\n" +
          "Long-term, OctaWipe has the potential to evolve into a standardized trust layer for device lifecycle management—bridging data security, compliance, and sustainable hardware reuse. By extending verification beyond the moment of wiping and into the lifetime of the asset, the system can help redefine how organizations think about digital trust in physical infrastructure."
      }
    ]
  },

  {
    id: "Neuro-Shield: Self Healing Cybersecurity Framework",
    title: "Neuro-Shield: Self Healing Cybersecurity Framework",
    category: "Cybersecurity / Linux OS / Random Forest",
    year: "May-June 2025",
    thumbnail: "/images/neuroshield/logo.jpg",
    heroImage: "/images/neuroshield/logo.jpg",
    githubLink: "https://github.com/TezorInnovate/NeuroShield",
    prototypeLink: "",
    
    // RECRUITER SUMMARY - Technical implementation highlights only
    summary: {
      tagline: "An AI-Based real-time Intrusion Detection and self-healing security Framework ",
      
      keyTechnologies: [
        "Wire Shark Packet tracing",
        "Random Forest Model",
        "UNSW-NB15 IDS Dataset",
        "Telgram Alert Bot",
        "Modular Software Design",
        "OS commands for attack defense"
      ],
      
      technicalHighlights: [
        {
          title: "System Modules",
          description: "The system contains multiple modules that interact with each other for combined functionality. The modules are: feature extractor, detector interface, healing engine, telegram bot. Each of the mmodules are explained as follows..."
        },
        {
          title: "Feature Extractor Module",
          description: "This module functions as the scanning phase which continuously monitors the system for network packets and then sends them as input for the detector interface. It only reads packets, no AI or detection is applied here."
        },
        {
          title: "Detector Interface",
          description: "This is the main script that combines all modules. On receiving packet information from the feature extractor, this script sends the packets to the trained Random forest model for inference. The model them sends the classification of each packet back to this module which then runs rule-based execution. If it is classified as an attack then the interface informs the healing engine of the attack and also informs the telegram bot. If it is a normal packet, then it is discarded."
        },
        {
          title: "Healing Engine",
          description: "This module is the attack defense layer which utilizes OS based commands for protecting the system from the attacks. For each of the attack types, there are different OS commands to be executed to take care of them accordingly."
        },
        {
          title: "Telegram Bot",
          description: "This module has a telegram bot created that sends notifications to the user if any attack is detected. It sends timestamps along with the label of the attack type."
        },
        {
          title: "Attack Simulator",
          description: "With the help of simulated data packets we can send safe attacks to the system to test out the software. By sending selected attack types, the system flags them as attacks and performs the necessary measures."
        }
      ],
      
      metrics: [
        "Model Precision: 94.1%",
        "Model Recall: 93.8%",
        "Model F1 score: 0.939",
        "IP Blocking: ~150 ms",
        "Connection kill: ~200 ms",
        "Port Closure: ~100 ms",
        "Logging: ~30 ms"
      ],
      
      architecture: "Modular workflow: System Packets → Feature Extractor → Detector Interface → Model → Healing Engine → Telegram Bot",
      
      // Select which images to showcase (image path + title)
      showcaseImages: [
        {
          image: "/images/neuroshield/architecture.png",
          title: "System Architecture"
        },
        {
          image: "/images/neuroshield/bot.jpeg",
          title: "Telegram Bot"
        },
        {
          image: "/images/neuroshield/terminal.jpg",
          title: "Terminal Output Window"
        },
        {
          image: "/images/neuroshield/matrix.jpeg",
          title: "Model Confusion Matrix"
        }
      ]
    },
    
    // Full detailed sections for ProjectDetail.jsx
    sections: [
      {
        id: "overview",
        title: "Overview",
        image: "/images/octawipe/overview.webp",
        content:
          "OctaWipe provides a secure and cross-platform solution for data erasure that can be used to promote safe IT asset recycling and reuse. The OctaWipe system was developed in accordance with various international standards on data destruction and provides a one-click user interface for secure data erasure from storage devices while ensuring forensic unrecoverability. The OctaWipe solution targets various users, including individuals, enterprises, and e-waste processors who require secure and verifiable wiping methods for their data."
      },
      {
        id: "context-problem",
        title: "Context, Motivation & Problem Statement",
        image: "/images/octawipe/problem.webp",
        content:
          "The problem of e-waste is growing at a very fast rate in India, with millions of devices being stored or discarded early because of the fear of exposing the data. Many people, organizations, and recycling centers avoid reselling or reusing these devices because they cannot ensure the complete removal of the sensitive information. The current methods of removing data are highly fragmented, platform-dependent, and require technical expertise, which is a major hindrance.\n\n" +
          "Currently, the greater part of the prevailing data destruction solutions is suffering from the aforementioned systemic issues. A substantial number of the solutions lack cross-platform compatibility, making them impractical and ineffective in heterogeneous environments. Others lack independent and verifiable evidence of sanitization, making the user and organization in question forced to employ an opaque wiping process without guarantees.\n\n" +
          "In large-scale enterprise settings, there are additional issues that come into play to efficiently sanitize a large number of devices. Bulk wiping a large number of devices can be a slow and laborious process. The problem is further compounded by modern storage media, such as SSDs and NVMe drives, where traditional overwriting methods do not suffice and forensic recoverability is a valid concern. OctaWipe was developed to address the usability, scale, verification, and trust issues within a single standards-based solution."
      },
      {
        id: "goals",
        title: "Design Goals",
        image: "/images/octawipe/goals.webp",
        content:
          "The system was designed around four primary goals: " +
          "(1) Full compliance with NIST 800-88 and DoD 5220.22-M data sanitization standards, " +
          "(2) Cross-platform usability across Windows, Linux, and Android environments, " +
          "(3) Support for bulk and network-based wiping at enterprise scale, " +
          "(4) Generation of tamper-proof, verifiable wiping certificates. " +
          "All architectural and tooling decisions were guided by these constraints."
      },
      {
        id: "architecture",
        title: "System Architecture",
        image: "/images/octawipe/architecture.webp",
        content:
          "OctaWipe has a modular architecture that uses a boot-independent wiping environment. Its operation starts by using a web-based or local portal, followed by a bootable execution using USB, ISO, and PXE Network Boot. Once executed, the device detects the storage devices, applies the wiping method, and then creates a digitally signed certificate that includes the logs and the metadata."
      },
      {
        id: "sanitization",
        title: "Disk Detection & Sanitization Engine",
        image: "/images/octawipe/sanitization.webp",
        content:
          "Essentially, the core idea behind OctaWipe is the implementation of various sanitization methods, depending on the storage devices being used. For instance, when dealing with HDD devices, the tool supports both multi-pass and single-pass overwriting using the shred method. On the other hand, the tool uses ATA Secure Erase, blkdiscard, nvme-cli, and even cryptographic erase methods when dealing with SSD and NVMe devices. The tool also supports the wiping of HPA and DCO sectors."
      },
      {
        id: "boot",
        title: "Bootable & Network Deployment",
        image: "/images/octawipe/boot.webp",
        content:
          "To overcome the OS dependency, OctaWipe supports execution on Live USB, ISO, and PXE Network Boot. The advantage of using PXE Boot is that it allows one-click wiping of multiple machines, which is especially useful for enterprises and e-waste recycling centers. The execution environment is provided by Ubuntu 24.04 LTS."
      },
      {
        id: "verification-trust",
        title: "Verification, Certification & Tamper-Proof Trust Layer",
        image: "/images/octawipe/certification.webp",
        content:
          "Verification is treated as a first-class system component in OctaWipe rather than a post-process add-on. After sanitization, the system performs automated verification checks to ensure that the selected wiping standard has been correctly applied. These checks validate completion status, method integrity, and device-specific parameters, ensuring that no partial or silent failures go unnoticed.\n\n" +
          "Once verification is complete, OctaWipe generates digitally signed wiping certificates in both human-readable (PDF) and machine-readable (JSON) formats. Each certificate contains detailed metadata including device identifiers, storage type, applied wipe method, execution logs, timestamps, and cryptographic signatures. This enables both operational confirmation and long-term auditability.\n\n" +
          "To eliminate the risk of certificate tampering or forgery, OctaWipe introduces an additional immutable trust layer using blockchain anchoring. Rather than storing full certificates on-chain, cryptographic hashes of the signed wipe reports are anchored to a distributed ledger. This design preserves privacy while ensuring that any future alteration of a certificate can be independently detected.\n\n" +
          "By decoupling verification from centralized servers, the system avoids single points of failure and long-term dependency risks. The result is a robust trust architecture where wiping claims can be validated years later, even outside the original operational environment. This layered approach balances transparency, privacy, and durability without introducing unnecessary blockchain overhead."
      },
      {
        id: "standards",
        title: "Standards Compliance",
        image: "/images/octawipe/standards.webp",
        content:
          "OctaWipe adheres strictly to globally recognized data sanitization standards, including NIST 800-88, DoD 5220.22-M (E), and DoD 5220.22-M (ECE). These standards ensure that data is rendered unrecoverable using both software based and forensic techniques, making the solution suitable for regulated industries."
      },
      {
        id: "novelty",
        title: "Novelty & Innovation",
        image: "/images/octawipe/novelty.webp",
        content:
          "OctaWipe's novelty lies not in inventing new wiping algorithms, but in integrating existing, proven techniques into a cohesive, verifiable system. The combination of PXE-based bulk wiping, storage-aware sanitization methods, and cryptographically verifiable certificates is rarely seen in a single platform. Most existing tools focus either on wiping or reporting; OctaWipe treats verification as a first-class system component. This integration-first design enables scalability, auditability, and trust without sacrificing usability, making the solution suitable for both enterprise and field deployment scenarios."
      },
      {
        id: "impact-future",
        title: "Impact, Benefits & Future Scope",
        image: "/images/octawipe/future.webp",
        content:
          "OctaWipe addresses a critical trust deficit in the IT asset disposal and reuse lifecycle. By providing verifiable, tamper-resistant proof of data destruction, the system enables devices to be safely resold, refurbished, or recycled without fear of residual data leakage. This directly reduces unnecessary hardware disposal and supports circular economy practices, particularly in regions facing severe e-waste challenges.\n\n" +
          "For enterprises, OctaWipe significantly lowers compliance risk and operational overhead during large-scale decommissioning workflows. Automated verification, bulk wiping via PXE, and standardized certification streamline audit readiness and reduce reliance on manual reporting. For individuals and e-waste handlers, the system restores confidence that sensitive personal or organizational data has been permanently erased using recognized standards.\n\n" +
          "Looking ahead, future development will focus on deeper automation, intelligence, and ecosystem integration. Planned enhancements include policy-driven wipe recommendations based on device type, storage technology, and regulatory context, as well as tighter integration with enterprise asset management and ITSM systems. Expanded support for mobile, embedded, and IoT-class devices will further broaden applicability.\n\n" +
          "Long-term, OctaWipe has the potential to evolve into a standardized trust layer for device lifecycle management—bridging data security, compliance, and sustainable hardware reuse. By extending verification beyond the moment of wiping and into the lifetime of the asset, the system can help redefine how organizations think about digital trust in physical infrastructure."
      }
    ]
  },

  {
    id: "Intelligent Autonomous DNN for Vehicles",
    title: "Intelligent Autonomous Vehicles: DNNs within Cyber-Physical systems",
    category: "Computer Vision / DNN / MLP / NLP",
    year: "May-July 2024",
    thumbnail: "/images/ai-vision/hero.jpeg",
    heroImage: "/images/ai-vision/hero.jpeg",
    githubLink: "https://github.com/TezorInnovate/Yolov5-Object-detection",
    prototypeLink: "",
    
    // RECRUITER SUMMARY - Technical implementation highlights only
    summary: {
      tagline: "Bridging deep neural networks and transformer intelligence to power multimodal perception and decision-making in autonomous cyber-physical vehicle systems.",
      
      keyTechnologies: [
        "Yolov5 Object Detection",
        "Domain: For Autonomous Vehicles",
        "Real-Time + Picture + Video based inference",
      ],
      
      technicalHighlights: [
        {
          title: "Training Model",
          description: "By using a base Yolov5 model it is then trained on vehicle detection dataset for detecting cars, bikes, etc."
        },
        {
          title: "Inference",
          description: "After model training, we create an inference script that integrates the camera with the model ans runs inference. Based on the detection the script creates bounding boxes and represents which class each object in the feed works on. For image and video inference, we create a separate script that takes input files and produces output files with the respective bounding boxes edited into the files."
        }
      ],
      
      metrics: [
        "Model layers: 157",
        "Parameters: 7066762",
        "Classes: 13"
      ],
      
      architecture: "Modular workflow: Real-Time camera feed → Model Inference → Create bounding boxes → Label with precision",
      
      // Select which images to showcase (image path + title)
      showcaseImages: [
        {
          image: "/images/ai-vision/1.jpg",
          title: "Test image 1"
        },
        {
          image: "/images/ai-vision/2.jpg",
          title: "Test image 2"
        },
        
        {
          image: "/images/ai-vision/3.jpg",
          title: "Test image 3"
        },
        {
          image: "/images/ai-vision/4.jpg",
          title: "Test image 4"
        }
      ]
    },
    
    // Full detailed sections for ProjectDetail.jsx
    sections: [
      {
        id: "overview",
        title: "Overview",
        image: "/images/octawipe/overview.webp",
        content:
          "OctaWipe provides a secure and cross-platform solution for data erasure that can be used to promote safe IT asset recycling and reuse. The OctaWipe system was developed in accordance with various international standards on data destruction and provides a one-click user interface for secure data erasure from storage devices while ensuring forensic unrecoverability. The OctaWipe solution targets various users, including individuals, enterprises, and e-waste processors who require secure and verifiable wiping methods for their data."
      },
      {
        id: "context-problem",
        title: "Context, Motivation & Problem Statement",
        image: "/images/octawipe/problem.webp",
        content:
          "The problem of e-waste is growing at a very fast rate in India, with millions of devices being stored or discarded early because of the fear of exposing the data. Many people, organizations, and recycling centers avoid reselling or reusing these devices because they cannot ensure the complete removal of the sensitive information. The current methods of removing data are highly fragmented, platform-dependent, and require technical expertise, which is a major hindrance.\n\n" +
          "Currently, the greater part of the prevailing data destruction solutions is suffering from the aforementioned systemic issues. A substantial number of the solutions lack cross-platform compatibility, making them impractical and ineffective in heterogeneous environments. Others lack independent and verifiable evidence of sanitization, making the user and organization in question forced to employ an opaque wiping process without guarantees.\n\n" +
          "In large-scale enterprise settings, there are additional issues that come into play to efficiently sanitize a large number of devices. Bulk wiping a large number of devices can be a slow and laborious process. The problem is further compounded by modern storage media, such as SSDs and NVMe drives, where traditional overwriting methods do not suffice and forensic recoverability is a valid concern. OctaWipe was developed to address the usability, scale, verification, and trust issues within a single standards-based solution."
      },
      {
        id: "goals",
        title: "Design Goals",
        image: "/images/octawipe/goals.webp",
        content:
          "The system was designed around four primary goals: " +
          "(1) Full compliance with NIST 800-88 and DoD 5220.22-M data sanitization standards, " +
          "(2) Cross-platform usability across Windows, Linux, and Android environments, " +
          "(3) Support for bulk and network-based wiping at enterprise scale, " +
          "(4) Generation of tamper-proof, verifiable wiping certificates. " +
          "All architectural and tooling decisions were guided by these constraints."
      },
      {
        id: "architecture",
        title: "System Architecture",
        image: "/images/octawipe/architecture.webp",
        content:
          "OctaWipe has a modular architecture that uses a boot-independent wiping environment. Its operation starts by using a web-based or local portal, followed by a bootable execution using USB, ISO, and PXE Network Boot. Once executed, the device detects the storage devices, applies the wiping method, and then creates a digitally signed certificate that includes the logs and the metadata."
      },
      {
        id: "sanitization",
        title: "Disk Detection & Sanitization Engine",
        image: "/images/octawipe/sanitization.webp",
        content:
          "Essentially, the core idea behind OctaWipe is the implementation of various sanitization methods, depending on the storage devices being used. For instance, when dealing with HDD devices, the tool supports both multi-pass and single-pass overwriting using the shred method. On the other hand, the tool uses ATA Secure Erase, blkdiscard, nvme-cli, and even cryptographic erase methods when dealing with SSD and NVMe devices. The tool also supports the wiping of HPA and DCO sectors."
      },
      {
        id: "boot",
        title: "Bootable & Network Deployment",
        image: "/images/octawipe/boot.webp",
        content:
          "To overcome the OS dependency, OctaWipe supports execution on Live USB, ISO, and PXE Network Boot. The advantage of using PXE Boot is that it allows one-click wiping of multiple machines, which is especially useful for enterprises and e-waste recycling centers. The execution environment is provided by Ubuntu 24.04 LTS."
      },
      {
        id: "verification-trust",
        title: "Verification, Certification & Tamper-Proof Trust Layer",
        image: "/images/octawipe/certification.webp",
        content:
          "Verification is treated as a first-class system component in OctaWipe rather than a post-process add-on. After sanitization, the system performs automated verification checks to ensure that the selected wiping standard has been correctly applied. These checks validate completion status, method integrity, and device-specific parameters, ensuring that no partial or silent failures go unnoticed.\n\n" +
          "Once verification is complete, OctaWipe generates digitally signed wiping certificates in both human-readable (PDF) and machine-readable (JSON) formats. Each certificate contains detailed metadata including device identifiers, storage type, applied wipe method, execution logs, timestamps, and cryptographic signatures. This enables both operational confirmation and long-term auditability.\n\n" +
          "To eliminate the risk of certificate tampering or forgery, OctaWipe introduces an additional immutable trust layer using blockchain anchoring. Rather than storing full certificates on-chain, cryptographic hashes of the signed wipe reports are anchored to a distributed ledger. This design preserves privacy while ensuring that any future alteration of a certificate can be independently detected.\n\n" +
          "By decoupling verification from centralized servers, the system avoids single points of failure and long-term dependency risks. The result is a robust trust architecture where wiping claims can be validated years later, even outside the original operational environment. This layered approach balances transparency, privacy, and durability without introducing unnecessary blockchain overhead."
      },
      {
        id: "standards",
        title: "Standards Compliance",
        image: "/images/octawipe/standards.webp",
        content:
          "OctaWipe adheres strictly to globally recognized data sanitization standards, including NIST 800-88, DoD 5220.22-M (E), and DoD 5220.22-M (ECE). These standards ensure that data is rendered unrecoverable using both software based and forensic techniques, making the solution suitable for regulated industries."
      },
      {
        id: "novelty",
        title: "Novelty & Innovation",
        image: "/images/octawipe/novelty.webp",
        content:
          "OctaWipe's novelty lies not in inventing new wiping algorithms, but in integrating existing, proven techniques into a cohesive, verifiable system. The combination of PXE-based bulk wiping, storage-aware sanitization methods, and cryptographically verifiable certificates is rarely seen in a single platform. Most existing tools focus either on wiping or reporting; OctaWipe treats verification as a first-class system component. This integration-first design enables scalability, auditability, and trust without sacrificing usability, making the solution suitable for both enterprise and field deployment scenarios."
      },
      {
        id: "impact-future",
        title: "Impact, Benefits & Future Scope",
        image: "/images/octawipe/future.webp",
        content:
          "OctaWipe addresses a critical trust deficit in the IT asset disposal and reuse lifecycle. By providing verifiable, tamper-resistant proof of data destruction, the system enables devices to be safely resold, refurbished, or recycled without fear of residual data leakage. This directly reduces unnecessary hardware disposal and supports circular economy practices, particularly in regions facing severe e-waste challenges.\n\n" +
          "For enterprises, OctaWipe significantly lowers compliance risk and operational overhead during large-scale decommissioning workflows. Automated verification, bulk wiping via PXE, and standardized certification streamline audit readiness and reduce reliance on manual reporting. For individuals and e-waste handlers, the system restores confidence that sensitive personal or organizational data has been permanently erased using recognized standards.\n\n" +
          "Looking ahead, future development will focus on deeper automation, intelligence, and ecosystem integration. Planned enhancements include policy-driven wipe recommendations based on device type, storage technology, and regulatory context, as well as tighter integration with enterprise asset management and ITSM systems. Expanded support for mobile, embedded, and IoT-class devices will further broaden applicability.\n\n" +
          "Long-term, OctaWipe has the potential to evolve into a standardized trust layer for device lifecycle management—bridging data security, compliance, and sustainable hardware reuse. By extending verification beyond the moment of wiping and into the lifetime of the asset, the system can help redefine how organizations think about digital trust in physical infrastructure."
      }
    ]
  }
  // Add more projects here
];