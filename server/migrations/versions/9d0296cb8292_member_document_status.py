"""

Revision ID: 9d0296cb8292
Revises: 75e7e52f5403
Create Date: 2023-06-02 11:31:16.043644

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '9d0296cb8292'
down_revision = '75e7e52f5403'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute("CREATE TYPE memberdocumentstatus AS ENUM ('PENDING', 'VALID');")
    op.add_column(
        'member_documents',
        sa.Column('status',
                  sa.Enum('PENDING', 'VALID', name='memberdocumentstatus'),
                  nullable=False,
                  server_default='PENDING'
                  )
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('member_documents', 'status')
    op.execute("DROP TYPE memberdocumentstatus")
    # ### end Alembic commands ###