function escapeHtml(value) {
  return String(value).replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        character
      ],
  );
}

export function renderWeeks(
  element,
  plan,
  currentWeek,
  completedDays,
  onSelect,
) {
  element.innerHTML = plan
    .map((week) => {
      const completed = week.days.filter((day) =>
        completedDays.includes(day.day),
      ).length;
      return `<li class="week-item ${week.week === currentWeek ? "active" : ""}" data-week="${week.week}" tabindex="0" role="button">
            <span>Week ${week.week}: ${escapeHtml(week.title)}</span><span class="status">${completed}/${week.days.length}</span>
        </li>`;
    })
    .join("");

  element.querySelectorAll("[data-week]").forEach((item) => {
    const select = () => onSelect(Number(item.dataset.week));
    item.addEventListener("click", select);
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") select();
    });
  });
}

export function renderDays(element, week, completedDays, onToggle) {
  const isAngularFocus = week.week >= 5 && week.week <= 7;
  element.innerHTML = week.days
    .map((day) => {
      const completed = completedDays.includes(day.day);
      return `<article class="day-card ${completed ? "completed" : ""}">
        <div class="day-tag">${isAngularFocus ? "Angular" : ".NET"}</div>
        <div class="card-header"><div class="day-overline"><span>DAY ${day.day}</span><span class="day-status">${completed ? "Complete" : "In progress"}</span></div><h3>${escapeHtml(day.title)}</h3></div>
        <div class="card-body"><div class="card-section-heading"><h4>Topics to cover</h4><span>${day.topics.length} items</span></div><div class="topics">
                ${day.topics.map((topic) => `<div class="topic-item"><i class="fas fa-check-circle"></i><span>${escapeHtml(topic)}</span></div>`).join("")}
            </div><div class="resources"><div class="card-section-heading"><h4><i class="fas fa-book"></i> Resources</h4><span>${day.resources.length} links</span></div>
                ${day.resources.map((resource) => `<div class="resource-item"><i class="fas fa-link"></i><span><a href="${escapeHtml(resource.url)}" target="_blank" rel="noreferrer" class="resource-link">${escapeHtml(resource.title)}</a></span></div>`).join("")}
            </div></div>
            <div class="card-footer"><div class="day-number"><i class="fas fa-clock"></i> Study checkpoint</div>
              <button class="completed-toggle" data-day="${day.day}" type="button"><span>${completed ? "Completed" : "Mark complete"}</span><span class="checkmark" aria-hidden="true"></span></button>
            </div>
        </article>`;
    })
    .join("");

  element
    .querySelectorAll("[data-day]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        onToggle(Number(button.dataset.day)),
      ),
    );
}

export function updateProgress(elements, completedDays, totalDays) {
  const percent = Math.round((completedDays.length / totalDays) * 100);
  elements.text.textContent = `${completedDays.length}/${totalDays} Days Completed`;
  elements.percent.textContent = `${percent}%`;
  elements.fill.style.width = `${percent}%`;
}
