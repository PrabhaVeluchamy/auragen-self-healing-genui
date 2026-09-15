# AuraGen: Self-Healing Generative UI via Cognitive Load

## Infotact Solutions Internship Project

AuraGen is an intelligent user interface prototype that monitors user interaction patterns and dynamically adapts the interface based on the user's estimated cognitive load.

The main goal of AuraGen is to reduce user effort, hesitation, and interaction difficulty by providing a more adaptive and user-friendly interface.

---

## 1. Project Overview

Traditional user interfaces usually remain unchanged even when users experience confusion, hesitation, or difficulty while completing a form.

AuraGen introduces the concept of a **self-healing user interface**.

The system observes user interaction data such as:

- Mouse movement
- Mouse movement distance
- Field focus changes
- Field interaction frequency
- Hesitation time
- Form interaction patterns

Based on this information, AuraGen calculates an estimated cognitive load score and changes the user interface accordingly.

---

## 2. Problem Statement

Users may experience difficulty while interacting with complex forms.

Common problems include:

- Too many form fields
- Repeated field interactions
- Long hesitation time
- Unclear user flow
- Excessive mouse movement
- Difficulty understanding the next action

A traditional interface does not automatically respond to these difficulties.

Therefore, AuraGen attempts to solve this problem by detecting interaction friction and adapting the interface dynamically.

---

## 3. Project Objectives

The main objectives of AuraGen are:

1. Monitor user interaction patterns.
2. Track mouse movement and interaction history.
3. Detect possible hesitation.
4. Count user interactions with form fields.
5. Calculate an estimated cognitive load score.
6. Detect low, medium, and high cognitive load levels.
7. Dynamically change the interface based on cognitive load.
8. Display helpful guidance when the user needs assistance.
9. Simplify the form when the cognitive load becomes high.
10. Demonstrate the concept of a self-healing generative user interface.

---

## 4. Main Features

### 4.1 Financial Information Form

The prototype contains a financial information form with the following fields:

- Annual Income
- Tax Identification Number
- Investment Amount
- Tax Category

The user can enter information and submit the form.

---

### 4.2 Mouse Movement Tracking

AuraGen tracks the current mouse position.

The system records:

- X coordinate
- Y coordinate
- Mouse movement count

This data is used to understand the user's interaction behavior.

---

### 4.3 Mouse Movement History

The application stores the latest mouse movement positions.

The recent movement history helps display how the mouse moved during the user's interaction with the interface.

The prototype currently displays the latest five mouse positions.

---

### 4.4 Movement Analysis

AuraGen calculates:

- Total mouse movement distance
- Average movement distance
- Movement count
- Movement status

The movement status can be:

- Stable
- Moderate Movement
- High Movement

---

### 4.5 Hesitation Detection

AuraGen includes a basic hesitation detection mechanism.

If the user remains inactive for a period of time, the system increases the hesitation timer.

The prototype identifies hesitation when the timer reaches the defined threshold.

This feature is a basic demonstration and can be improved using more advanced behavioral analysis in the future.

---

### 4.6 Active Field Tracking

The application tracks which form field is currently active.

For example:

- Annual Income
- Tax ID
- Investment Amount
- Tax Category

The active field is highlighted visually to help the user understand where they are working.

---

### 4.7 Field Interaction Counters

AuraGen counts how many times the user focuses on each form field.

The system records interaction counts for:

- Annual Income
- Tax ID
- Investment Amount
- Tax Category

Repeated interactions may indicate that the user is experiencing difficulty with a particular field.

---

### 4.8 Friction Score

The application calculates an estimated friction score using interaction-related values such as:

- Mouse movement count
- Average movement distance
- Hesitation status

The friction score is limited to a range of 0 to 100.

The friction status can be:

- Low
- Medium
- High

---

### 4.9 Cognitive Load Score

AuraGen calculates an estimated cognitive load score using:

- Hesitation score
- Field interaction score
- Mouse movement score

The final cognitive load score is limited to a range of 0 to 100.

The cognitive load status is classified as:

| Score Range | Cognitive Load Status |
|-------------|-----------------------|
| 0–29        | Low                   |
| 30–59       | Medium                |
| 60–100      | High                  |

---

### 4.10 Self-Healing User Interface

The interface dynamically changes based on the cognitive load status.

#### Low Cognitive Load

The normal interface is displayed.

#### Medium Cognitive Load

The application displays guidance to help the user.

Example:

> Take your time. Complete the fields one by one.

#### High Cognitive Load

The application activates Simplified Form Mode.

The system temporarily hides advanced fields to reduce the user's effort.

---

### 4.11 Simplified Form Mode

When the cognitive load becomes high:

- Advanced fields are temporarily hidden.
- Only the important fields remain visible.
- The user can select `Show All Fields`.
- The user can return to simplified mode.

This demonstrates how a user interface can adapt itself based on user behavior.

---

### 4.12 AuraGen Decision Engine

The Decision Engine selects an adaptation action based on the cognitive load status.

| Cognitive Load | Decision Engine Action |
|----------------|------------------------|
| Low            | `NORMAL_MODE`          |
| Medium         | `SHOW_GUIDANCE`        |
| High           | `SIMPLIFY_FORM`        |

The Decision Engine is responsible for selecting the appropriate interface adaptation.

---

## 5. System Workflow

The overall workflow of AuraGen is:

```text
User Interaction
       |
       v
Interaction Telemetry
       |
       v
Mouse and Field Tracking
       |
       v
Hesitation Detection
       |
       v
Friction Score Calculation
       |
       v
Cognitive Load Calculation
       |
       v
AuraGen Decision Engine
       |
       v
Interface Adaptation
       |
       +--------------------+
       |                    |
       v                    v
 NORMAL MODE        GUIDANCE MODE
                            |
                            v
                    SIMPLIFIED FORM MODE