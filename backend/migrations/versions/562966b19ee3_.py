"""empty message

Revision ID: 562966b19ee3
Revises: c0eb53fe1135
Create Date: 2024-08-07 15:22:05.247145

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql


# revision identifiers, used by Alembic.
revision = '562966b19ee3'
down_revision = 'c0eb53fe1135'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('tasks',
                    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
                    sa.Column('task_name', sa.String(length=225), nullable=False),
                    sa.Column('status', sa.Integer(), nullable=False),
                    sa.Column('created_at', mysql.TIMESTAMP(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
                    sa.Column('updated_at', mysql.TIMESTAMP(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
                    sa.PrimaryKeyConstraint('id')
                    )


def downgrade():
    op.drop_table('tasks')
