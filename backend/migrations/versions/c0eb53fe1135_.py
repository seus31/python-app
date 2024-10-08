"""empty message

Revision ID: c0eb53fe1135
Revises: e6e24f751801
Create Date: 2024-07-24 07:52:19.767045

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c0eb53fe1135'
down_revision = 'e6e24f751801'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(length=225), nullable=False))
        batch_op.add_column(sa.Column('password', sa.String(length=225), nullable=False))
        batch_op.create_unique_constraint(None, ['email'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('password')
        batch_op.drop_column('email')

    # ### end Alembic commands ###
