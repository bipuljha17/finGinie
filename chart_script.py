import plotly.graph_objects as go
import json

# Data from the provided JSON
data = {
  "parameters": [
    {"name": "Problem Statement & GenAI Vision", "score": 95, "description": "Clear problem articulation with innovative GenAI solution"},
    {"name": "Target Persona & Business Case", "score": 90, "description": "Data-driven personas with quantified business value"},
    {"name": "AI-Driven Validation & Insights", "score": 92, "description": "Mega prompting with cluster analysis validation"},
    {"name": "Experimentation & Feasibility", "score": 88, "description": "90-day plan with clear assumptions and metrics"},
    {"name": "GenAI Prototype & Architecture", "score": 85, "description": "Functional prototype with RAG implementation"},
    {"name": "AI Value Roadmap & Ethics", "score": 93, "description": "Strategic roadmap with comprehensive ethical framework"},
    {"name": "Presentation Quality", "score": 96, "description": "Interactive design with compelling storytelling"}
  ]
}

# Abbreviate parameter names to fit 15-character limit
abbreviated_names = [
    "Problem & Vision",
    "Persona & Biz", 
    "AI Validation",
    "Experimentation",
    "GenAI Prototype",
    "Roadmap/Ethics",
    "Presentation"
]

# Extract scores
scores = [param["score"] for param in data["parameters"]]

# Brand colors in order
colors = ['#1FB8CD', '#DB4545', '#2E8B57', '#5D878F', '#D2BA4C', '#B4413C', '#964325']

# Create horizontal bar chart
fig = go.Figure(data=[
    go.Bar(
        y=abbreviated_names,
        x=scores,
        orientation='h',
        marker=dict(color=colors),
        text=[f'{score}%' for score in scores],
        textposition='inside',
        textfont=dict(color='white', size=12),
        cliponaxis=False
    )
])

# Update layout
fig.update_layout(
    title="FinGenie Capstone: Rubric Excellence Targets",
    xaxis_title="Target Score (%)",
    yaxis_title="Rubric Parameters",
    showlegend=False
)

# Update axes
fig.update_xaxes(range=[0, 100], dtick=20)
fig.update_yaxes(categoryorder='array', categoryarray=abbreviated_names[::-1])

# Save the chart
fig.write_image("fingenie_rubric_chart.png")