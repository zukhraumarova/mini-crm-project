CREATE OR REPLACE VIEW vw_pipeline_report AS

SELECT

    owner_id,

    stage,

    COUNT(*) AS deal_count,

    SUM(amount) AS total_amount,

    AVG(amount) AS average_amount,

    MIN(created_at) AS first_deal,

    MAX(created_at) AS last_deal

FROM deals

GROUP BY owner_id, stage;