"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCollectionsByGroup } from "@/lib/shopify";

export default function FooterShopLinks() {
  const [groups, setGroups] = useState({});

  useEffect(() => {
    async function loadGroups() {
      const data = await fetchCollectionsByGroup();
      setGroups(data);
    }
    loadGroups();
  }, []);

  return (
    <div>
      <h4 className="font-semibold mb-4">Shop</h4>
      <ul className="space-y-2 text-neutral-500">
        {Object.keys(groups).length > 0 ? (
          Object.keys(groups).map((groupName) => (
            <li key={groupName}>
              <Link
                href={`/Shop/${encodeURIComponent(
                  groupName
                )}?title=${encodeURIComponent(
                  groupName
                )}&tabs=${encodeURIComponent(
                  groups[groupName].map((c) => c.title).join(",")
                )}`}
                className=""
              >
                {groupName}
              </Link>
            </li>
          ))
        ) : (
          <li className="text-neutral-400 text-sm">Loading...</li>
        )}
      </ul>
    </div>
  );
}
