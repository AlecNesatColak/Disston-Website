from enum import Enum


class MatchStatusEnum(str, Enum):
    SCHEDULED = "SCHEDULED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    POSTPONED = "POSTPONED"
    CANCELLED = "CANCELLED"
